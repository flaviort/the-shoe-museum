// npm run push: publish to the live theme. Strict on purpose: every check
// stops before anything reaches live. Pass --dry-run to run the checks and
// the build without pushing anything.

import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ok, info, warn, fail, title } from './lib/log.mjs'
import { run } from './lib/run.mjs'
import { loadEnv, shopifyArgs } from './lib/env.mjs'
import { git, dirtyPaths, countCommits, commitPaths } from './lib/git.mjs'
import {
    pullLiveJson, readThemeJson, compareLive, writeLiveFiles, writeMergeFiles,
    loadBase, historyOf, fingerprint, NORMALIZE_SUBJECT,
} from './lib/live.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dryRun = process.argv.includes('--dry-run')
const pad = '          '
const indent = (lines, extra = '') => lines.map((line) => `${pad}${extra}${line}`).join('\n')
const union = (a, b) => [...new Set([...a.keys(), ...b.keys()])]

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
if (behind > 0) {
    stop(
        `GitHub has ${behind} newer commit(s) that are not here yet. Run npm run dev to get them, then push again.\n` +
        `${pad}If npm run dev warns that it could not get the latest code, see _docs/08-troubleshooting.md.`,
    )
}
ok('Up to date with GitHub')

// 3. Build
info('Building CSS and JS...')
if (run('npx', ['gulp', 'build'], { cwd: root, live: true }).code !== 0) stop('The build failed. See the errors above.')
ok('Build finished')

// 4. Customizer edits made on live since the last sync. Checked after the
// build so the gap before the upload stays short.
info('Checking the live theme for customizer changes...')
const live = pullLiveJson(env)
if (!live.ok) stop(`Could not read the live theme: ${live.error}`)
const local = readThemeJson(root)
const { tracking, base, refs } = loadBase(root, union(live.files, local))
if (!tracking) info('No live branch yet: change tracking for customizer files starts with this first publish')
const diff = compareLive({ live: live.files, local, base, dirty: new Set(), history: historyOf(root) })
const incoming = [...diff.changed, ...diff.added]
if (incoming.length || diff.conflict.length) stop(customizerMessage(incoming, diff.conflict))
for (const path of diff.deletedLocally) info(`${path} was deleted here; this push removes it from live`)
ok('No unsynced customizer changes on live')

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
const uploaded = git(root, 'rev-parse', 'HEAD').stdout.trim()
const upload = run('shopify', ['theme', 'push', '--live', '--allow-live', '--no-color', ...shopifyArgs('push', env)], { cwd: root, live: true })
if (upload.code !== 0) {
    fail('The theme upload failed. The code is on GitHub, but the live site may be partly updated. Run npm run push again.')
    process.exit(1)
}
ok('Live theme updated')

// 7. Shopify reformats JSON on upload. Save its version so the next push does
// not mistake the formatting for customizer edits. The base here is what was
// just uploaded, so any difference is Shopify's.
let published = uploaded
const after = pullLiveJson(env)
if (!after.ok) {
    warn('Could not re-read the live theme. If the next push stops on customizer changes, they are probably only formatting.')
} else {
    const now = readThemeJson(root)
    const paths = union(after.files, now)
    const d = compareLive({
        live: after.files,
        local: now,
        base: new Map(paths.map((path) => [path, fingerprint(now.get(path))])),
    })
    if (d.conflict.length) warn(`Not found on the live theme after the upload. Run npm run push again:\n${indent(d.conflict)}`)
    const normalized = [...d.changed, ...d.added]
    if (normalized.length) {
        writeLiveFiles(root, after.files, normalized)
        if (commitPaths(root, normalized, NORMALIZE_SUBJECT).code !== 0 || git(root, 'push', '-q').code !== 0) {
            warn('Saved Shopify formatting locally but could not send it to GitHub. Run npm run dev to retry.')
        } else {
            published = git(root, 'rev-parse', 'HEAD').stdout.trim()
        }
    }
}

// 8. Move the live branch on GitHub to what is now published. It is the base
// the next compare uses. Fast-forward only, never forced.
if (git(root, 'push', '-q', 'origin', `${published}:refs/heads/live`).code === 0) {
    ok('Marked this version as published (the live branch on GitHub)')
} else {
    warn(
        'Could not move the live branch on GitHub. The site is updated. Until the next publish moves it,\n' +
        `${pad}customizer files edited both here and in the customizer may be reported as conflicts.`,
    )
}

console.log('\n Done. Live at https://theshoemuseum.com\n')

function customizerMessage(taken, conflicts) {
    const lines = ['The live theme has customizer changes that are not in git yet.']
    const trailers = [...taken, ...conflicts].map((path) => `-m "Live-Merged: ${path} ${fingerprint(live.files.get(path))}"`)

    if (taken.length) {
        writeLiveFiles(root, live.files, taken)
        lines.push(
            `${pad}Changed only in the customizer. The live versions are now in your working copy (see git diff):`,
            indent(taken, '    '),
        )
    }
    if (conflicts.length) {
        const dir = writeMergeFiles(root, live.files, conflicts, refs)
        lines.push(
            `${pad}Changed both here and in the customizer. Nothing here was touched. The live copy (live/)`,
            `${pad}and the last version both sides shared (base/, when known) are in:`,
            `${pad}    ${dir}`,
            `${pad}Merge each one, keeping both sets of edits:`,
        )
        for (const path of conflicts) {
            const liveCopy = join(dir, 'live', path)
            const baseCopy = join(dir, 'base', path)
            if (!live.files.has(path)) {
                lines.push(`${pad}    ${path}: deleted in the customizer. Delete it here (git rm ${path}) or keep it.`)
            } else if (!local.has(path)) {
                lines.push(`${pad}    ${path}: deleted here, changed in the customizer. Restore it from ${liveCopy} or keep it deleted.`)
            } else if (existsSync(baseCopy)) {
                lines.push(`${pad}    git merge-file ${path} ${baseCopy} ${liveCopy}`)
            } else {
                lines.push(`${pad}    ${path}: no shared version on record. Merge ${liveCopy} into it by hand.`)
            }
        }
        lines.push(`${pad}git merge-file edits the local file in place and marks overlapping edits with <<<<<<< lines.`)
    }
    lines.push(
        `${pad}When every file is right, commit with these lines so the next push knows the live versions are in:`,
        `${pad}    git add -A`,
        `${pad}    git commit --allow-empty -m "Merge customizer changes from live" ${trailers.join(' ')}`,
        `${pad}Then push again.`,
    )
    return lines.join('\n')
}
