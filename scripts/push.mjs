// npm run push: publish to the live theme. Strict on purpose: every check
// stops before anything reaches live. Pass --dry-run to run the checks and
// the build without pushing anything.

import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ok, info, warn, fail, title } from './lib/log.mjs'
import { run } from './lib/run.mjs'
import { loadEnv, shopifyArgs } from './lib/env.mjs'
import { git, dirtyPaths, countCommits, wasDeleted, commitPaths } from './lib/git.mjs'
import { pullLiveJson, readThemeJson, compareLive, writeLiveFiles } from './lib/live.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dryRun = process.argv.includes('--dry-run')
const indent = (paths) => paths.map((p) => `          ${p}`).join('\n')

function stop(msg) {
    fail(msg)
    console.log('\n Nothing was pushed.\n')
    process.exit(1)
}

title(dryRun ? 'The Shoe Museum - push (dry run)' : 'The Shoe Museum - push to live')

// 1. Tools
if (run('shopify', ['version']).code !== 0) stop('Shopify CLI not found. Install it with: npm install -g @shopify/cli@latest')
if (!existsSync(join(root, 'node_modules'))) stop('Dependencies are missing. Run npm run dev once (it installs them), then push again.')
ok('Tools ready')
const env = loadEnv(root)

// 2. Git: clean, and nothing newer on GitHub
const pending = dirtyPaths(root)
if (pending.length) stop(`There are uncommitted changes. Commit or discard them first:\n${indent(pending)}`)
ok('No uncommitted changes')

if (git(root, 'fetch', '-q').code !== 0) stop('Could not reach GitHub to check for newer changes.')
const behind = countCommits(root, 'HEAD..@{u}')
if (behind === null) stop('This branch is not linked to GitHub. Ask for help before pushing.')
if (behind > 0) stop(`GitHub has ${behind} newer commit(s) that are not here yet. Run npm run dev to get them, then push again.`)
ok('Up to date with GitHub')

// 3. Customizer edits made on live since the last sync
info('Checking the live theme for customizer changes...')
const live = pullLiveJson(env)
if (!live.ok) stop(`Could not read the live theme: ${live.error}`)
const diff = compareLive({
    live: live.files,
    local: readThemeJson(root),
    dirty: new Set(),
    wasDeleted: (path) => wasDeleted(root, path),
})
const incoming = [...diff.changed, ...diff.added]
if (incoming.length) {
    writeLiveFiles(root, live.files, incoming)
    stop(
        `These were changed in the Shopify customizer since the last sync:\n${indent(incoming)}\n` +
        '          The live versions are now in your working copy. Review them with "git diff",\n' +
        '          merge them with your own edits, commit, then push again.',
    )
}
for (const path of diff.deletedLocally) info(`${path} was deleted here; this push removes it from live`)
ok('No unsynced customizer changes on live')

// 4. Build
info('Building CSS and JS...')
if (run('npx', ['gulp', 'build'], { cwd: root, live: true }).code !== 0) stop('The build failed. See the errors above.')
ok('Build finished')

if (dryRun) {
    ok('Dry run: every check passed. Nothing was pushed.')
    process.exit(0)
}

// 5. GitHub first, so a rejected push stops us before live changes
const ahead = countCommits(root, '@{u}..HEAD')
if (ahead > 0) {
    if (git(root, 'push', '-q').code !== 0) stop('GitHub rejected the push (someone pushed a moment ago). Run npm run dev, then push again.')
    ok(`Sent ${ahead} commit(s) to GitHub`)
}

// 6. Live theme
info('Uploading the theme to the live store...')
const upload = run('shopify', ['theme', 'push', '--live', '--allow-live', '--no-color', ...shopifyArgs('push', env)], { cwd: root, live: true })
if (upload.code !== 0) {
    fail('The theme upload failed. The code is on GitHub, but the live site may be partly updated. Run npm run push again.')
    process.exit(1)
}
ok('Live theme updated')

// 7. Shopify reformats JSON on upload. Save its version so the next push does
// not mistake the formatting for customizer edits.
const after = pullLiveJson(env)
if (!after.ok) {
    warn('Could not re-read the live theme. If the next push stops on customizer changes, they are probably only formatting.')
} else {
    const d = compareLive({ live: after.files, local: readThemeJson(root), dirty: new Set(), wasDeleted: (path) => wasDeleted(root, path) })
    const normalized = [...d.changed, ...d.added]
    if (normalized.length) {
        writeLiveFiles(root, after.files, normalized)
        if (commitPaths(root, normalized, 'sync: normalize after push').code !== 0 || git(root, 'push', '-q').code !== 0) {
            warn('Saved Shopify formatting locally but could not send it to GitHub. Run npm run dev to retry.')
        }
    }
}

console.log('\n Done. Live at https://theshoemuseum.com\n')
