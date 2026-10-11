// npm run dev: get the latest code and customizer content, then start the
// local preview. Never blocks on git state: anything unusual is a [warn] and
// the preview still starts.

import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ok, info, warn, fail, title } from './lib/log.mjs'
import { run, shellQuote } from './lib/run.mjs'
import { loadEnv, shopifyArgs } from './lib/env.mjs'
import { git, dirtyPaths, wasDeleted, commitPaths } from './lib/git.mjs'
import { pullLiveJson, readThemeJson, compareLive, writeLiveFiles } from './lib/live.mjs'

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

// 3. Customizer content from the live theme
info('Checking the live theme for customizer changes...')
const live = pullLiveJson(env)
if (!live.ok) {
    warn(`Could not read the live theme, so the preview may show old customizer content: ${live.error}`)
} else {
    const diff = compareLive({
        live: live.files,
        local: readThemeJson(root),
        dirty: new Set(dirtyPaths(root)),
        wasDeleted: (path) => wasDeleted(root, path),
    })
    for (const path of diff.skippedDirty) {
        warn(`Skipped ${path}: it changed on live, but it also has unsaved edits here. The two need merging before a push.`)
    }
    for (const path of diff.deletedLocally) {
        info(`${path} still exists on live but was deleted here; the next push removes it`)
    }

    const incoming = [...diff.changed, ...diff.added]
    if (!incoming.length) {
        ok('Customizer content is up to date')
    } else {
        writeLiveFiles(root, live.files, incoming)
        const commit = commitPaths(root, incoming, 'sync: customizer changes from live')
        if (commit.code !== 0) warn(`Copied ${incoming.length} customizer file(s) from live but could not commit them: ${commit.stderr.trim()}`)
        else if (git(root, 'push').code !== 0) warn(`Saved ${incoming.length} customizer change(s) from live, but could not send them to GitHub`)
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
    { cwd: root, killOthers: ['failure', 'success'] },
)
await result.catch(() => process.exit(1))
