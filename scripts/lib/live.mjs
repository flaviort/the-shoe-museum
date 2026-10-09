// The customizer saves its content into templates/*.json and
// config/settings_data.json on the live theme. These helpers pull those files
// into a temp folder and compare them with the local copy, so the scripts
// decide what to copy and the CLI never overwrites or deletes local files.

import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { run } from './run.mjs'
import { shopifyArgs } from './env.mjs'

export const LIVE_JSON = ['templates/*.json', 'config/settings_data.json']

export function readThemeJson(dir) {
    const files = new Map()
    const templates = join(dir, 'templates')
    if (existsSync(templates)) {
        for (const name of readdirSync(templates)) {
            if (name.endsWith('.json')) files.set(`templates/${name}`, readFileSync(join(templates, name), 'utf8'))
        }
    }
    const settings = join(dir, 'config/settings_data.json')
    if (existsSync(settings)) files.set('config/settings_data.json', readFileSync(settings, 'utf8'))
    return files
}

export function pullLiveJson(env) {
    const dir = mkdtempSync(join(tmpdir(), 'tsm-live-'))
    try {
        const only = LIVE_JSON.flatMap((glob) => ['--only', glob])
        const r = run(
            'shopify',
            ['theme', 'pull', '--live', '--path', dir, ...only, '--no-color', ...shopifyArgs('pull', env)],
            { timeout: 180_000 },
        )
        if (r.code !== 0) {
            const detail = (r.stderr || r.stdout).trim().split('\n').slice(-3).join(' ')
            return { ok: false, error: detail || 'the Shopify CLI did not answer (you may need to log in: run npm run dev in Terminal)' }
        }
        const files = readThemeJson(dir)
        if (files.size === 0) return { ok: false, error: 'the live theme returned no customizer files' }
        return { ok: true, files }
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
}

const normalize = (s) => s.replace(/\r\n/g, '\n').trimEnd()

export function compareLive({ live, local, dirty, wasDeleted }) {
    const result = { changed: [], added: [], deletedLocally: [], skippedDirty: [] }
    for (const [path, content] of live) {
        if (local.has(path) && normalize(local.get(path)) === normalize(content)) continue
        if (dirty.has(path)) result.skippedDirty.push(path)
        else if (!local.has(path)) (wasDeleted(path) ? result.deletedLocally : result.added).push(path)
        else result.changed.push(path)
    }
    return result
}

export function writeLiveFiles(root, live, paths) {
    for (const path of paths) {
        const file = join(root, path)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, live.get(path))
    }
}
