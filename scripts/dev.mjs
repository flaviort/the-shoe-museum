// npm run dev: get the latest code and customizer content, then start the
// local preview. Never blocks on git state: anything unusual is a [warn] and
// the preview still starts.

import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ok, info, warn, fail, title } from './lib/log.mjs'
import { run, shellQuote } from './lib/run.mjs'
import { loadEnv, shopifyArgs } from './lib/env.mjs'
import { git, dirtyPaths, countCommits, commitPaths } from './lib/git.mjs'
import {
    pullLiveJson, readThemeJson, compareLive, writeLiveFiles, loadBase, historyOf, SYNC_SUBJECT,
} from './lib/live.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

title('The Shoe Museum - dev')

// 1. Tools
if (run('shopify', ['version']).code !== 0) {
    fail('Shopify CLI not found. Install it with: npm install -g @shopify/cli@latest')
    process.exit(1)
}
ok('Shopify CLI found')

if (!existsSync(join(root, 'node_modules'))) {
    info('Installing dependencies (first run only)...')
    if (run('npm', ['install'], { cwd: root, live: true }).code !== 0) {
        fail('npm install failed. See the output above.')
        process.exit(1)
    }
}
ok('Dependencies installed')

const env = loadEnv(root)
if (env.SHOPIFY_CLI_THEME_TOKEN) ok('Using the Theme Access token from .env')
else info('No token in .env, using your Shopify login')

// 2. Git
const pending = dirtyPaths(root)
if (pending.length) warn(`${pending.length} uncommitted change(s). Starting anyway; commit them when you are done.`)
else ok('No uncommitted changes')

if (git(root, 'pull', '--ff-only', '--autostash').code === 0) ok('Up to date with GitHub')
else warn('Could not get the latest code from GitHub (offline, or you both committed at once). Sort this out before pushing.')
// The live branch marks what was last published. Missing before the first publish.
git(root, 'fetch', '-q', 'origin', 'live')

// 3. Customizer content from the live theme
info('Checking the live theme for customizer changes...')
const live = pullLiveJson(env)
if (!live.ok) {
    warn(`Could not read the live theme, so the preview may show old customizer content: ${live.error}`)
} else {
    const local = readThemeJson(root)
    const { tracking, base } = loadBase(root, [...new Set([...live.files.keys(), ...local.keys()])])
    if (!tracking) info('Change tracking for customizer files starts with the first publish')
    const diff = compareLive({
        live: live.files,
        local,
        base,
        dirty: new Set(dirtyPaths(root)),
        history: historyOf(root),
    })
    for (const path of diff.skippedDirty) {
        warn(`Skipped ${path}: it changed in the customizer, but it also has uncommitted edits here. The two need merging before a push.`)
    }
    for (const path of diff.conflict) {
        const what = !live.files.has(path) ? 'was deleted in the customizer but is still here'
            : !local.has(path) ? 'was deleted here but changed in the customizer'
            : 'changed both here and in the customizer'
        warn(`${path} ${what}. Claude needs to merge before publishing (npm run push -- --dry-run shows how).`)
    }
    for (const path of diff.deletedLocally) {
        info(`${path} still exists on live but was deleted here; the next push removes it`)
    }

    const incoming = [...diff.changed, ...diff.added]
    if (!incoming.length) {
        if (!diff.conflict.length && !diff.skippedDirty.length) ok('Customizer content is up to date')
    } else {
        // Send the sync commit to GitHub only when it is the only commit
        // waiting. Other local commits go to GitHub with the next publish.
        const waiting = countCommits(root, '@{u}..HEAD')
        const saved = `Saved ${incoming.length} customizer change(s) from live here`
        writeLiveFiles(root, live.files, incoming)
        const commit = commitPaths(root, incoming, SYNC_SUBJECT)
        if (commit.code !== 0) warn(`Copied ${incoming.length} customizer file(s) from live but could not commit them: ${commit.stderr.trim()}`)
        else if (waiting === null) warn(`${saved}, but this branch is not linked to GitHub, so they were not sent there`)
        else if (waiting > 0) warn(`${saved}. Other commits here are not published yet, so they all go to GitHub with the next publish.`)
        else if (git(root, 'push', '-q').code !== 0) warn(`Saved ${incoming.length} customizer change(s) from live, but could not send them to GitHub`)
        else ok(`Saved ${incoming.length} customizer change(s) from live and sent them to GitHub`)
    }
}

// 4. Preview
const themeDev = ['shopify', 'theme', 'dev', ...shopifyArgs('dev', env)].map(shellQuote).join(' ')
console.log('\n Starting the preview. Open the local link it prints (usually http://127.0.0.1:9292). Ctrl+C stops it.\n')

const { default: concurrently } = await import('concurrently')
const { result } = concurrently(
    [
        { command: themeDev, name: 'shopify', prefixColor: 'cyan' },
        { command: 'npx gulp watch', name: 'css+js', prefixColor: 'magenta' },
    ],
    { cwd: root, killOthersOn: ['failure', 'success'] },
)
await result.catch(() => process.exit(1))
