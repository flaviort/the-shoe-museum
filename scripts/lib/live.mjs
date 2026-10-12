// The customizer saves its content into templates/*.json, sections/*.json,
// locales/*.json (the language editor) and config/settings_data.json on the
// live theme. These helpers pull those files into a temp folder and compare
// them with the local copy, so the scripts decide what to copy and the CLI
// never overwrites or deletes local files.
//
// The compare is three-way. The base for a file is the last version both
// sides agreed on, newest first:
//   1. a "Live-Merged: <path> <fingerprint>" line in a commit message, written
//      after merging a conflict by hand,
//   2. the content in a commit made by the scripts themselves (SYNC_SUBJECTS),
//      which always holds the live version byte for byte,
//   3. the content in origin/live, the commit last published to the live theme.
// Only commits after origin/live count. Before the first publish there is no
// origin/live, so files without 1 or 2 fall back to a two-way compare that
// uses git history to avoid undoing committed work.

import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { run } from './run.mjs'
import { shopifyArgs } from './env.mjs'
import { refExists, logCommits, showFile, pathVersions } from './git.mjs'

export const LIVE_JSON = ['templates/*.json', 'sections/*.json', 'locales/*.json', 'config/settings_data.json']
export const LIVE_REF = 'origin/live'
export const SYNC_SUBJECT = 'sync: customizer changes from live'
export const NORMALIZE_SUBJECT = 'sync: normalize after push'
const SYNC_SUBJECTS = [SYNC_SUBJECT, NORMALIZE_SUBJECT]
const MERGED = /^Live-Merged: (\S+) ([0-9a-f]{16}|deleted)\s*$/gm
const DELETED = 'deleted'

export function isCustomizerPath(path) {
    if (path === 'config/settings_data.json') return true
    if (/^(templates|sections)\/[^/]+\.json$/.test(path)) return true
    return /^locales\/[^/]+\.json$/.test(path) && !path.endsWith('.schema.json')
}

export function readThemeJson(dir) {
    const files = new Map()
    for (const folder of ['templates', 'sections', 'locales']) {
        const full = join(dir, folder)
        if (!existsSync(full)) continue
        for (const entry of readdirSync(full, { withFileTypes: true })) {
            const path = `${folder}/${entry.name}`
            if (entry.isFile() && isCustomizerPath(path)) files.set(path, readFileSync(join(full, entry.name), 'utf8'))
        }
    }
    const settings = join(dir, 'config/settings_data.json')
    if (existsSync(settings)) files.set('config/settings_data.json', readFileSync(settings, 'utf8'))
    return files
}

// Paths of files that still hold git conflict markers (a line starting with
// "<<<<<<< " or ">>>>>>> ", or "=======" alone). Such a file is not valid JSON,
// and Shopify rejects it partway through an upload.
export function findConflictMarkers(files) {
    const marker = /^(<<<<<<< |>>>>>>> |=======\r?$)/m
    return [...files].filter(([, content]) => marker.test(content)).map(([path]) => path).sort()
}

// The CLI frames its errors in a box. Keep the last one or two lines of text.
export function cliError(text) {
    return text
        .split(/\r?\n/)
        .map((line) => line.replace(/[─-╿]/g, '').trim())
        .filter(Boolean)
        .slice(-2)
        .join(' ')
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
            const detail = cliError(r.stderr) || cliError(r.stdout)
            return { ok: false, error: detail || 'the Shopify CLI did not answer (you may need to log in: run npm run dev in Terminal)' }
        }
        const files = readThemeJson(dir)
        if (files.size === 0) return { ok: false, error: 'the live theme returned no customizer files' }
        return { ok: true, files }
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
}

// Short hash of the content with line endings and trailing whitespace
// ignored. A missing file is "deleted".
export function fingerprint(content) {
    if (content === null || content === undefined) return DELETED
    const normalized = content.replace(/\r\n/g, '\n').trimEnd()
    return createHash('sha256').update(normalized).digest('hex').slice(0, 16)
}

// base: Map of path -> fingerprint of the agreed version, or null when there
// is none at all. A path missing from the map uses the two-way rules.
// history(path): fingerprints of every committed version of that path.
export function compareLive({ live, local, base, dirty = new Set(), history = () => new Set() }) {
    const result = { changed: [], added: [], conflict: [], deletedLocally: [], localOnly: [], skippedDirty: [] }
    const paths = [...new Set([...live.keys(), ...local.keys()])].sort()
    for (const path of paths) {
        const theirs = live.has(path) ? fingerprint(live.get(path)) : DELETED
        const mine = local.has(path) ? fingerprint(local.get(path)) : DELETED
        if (theirs === mine) continue
        const kind = base && base.has(path) ? threeWay(theirs, mine, base.get(path)) : twoWay(theirs, mine, history(path))
        // Unsaved edits are never overwritten, and never reported as a conflict
        // before they are committed.
        const touchesLocal = kind === 'changed' || kind === 'added' || kind === 'conflict'
        result[touchesLocal && dirty.has(path) ? 'skippedDirty' : kind].push(path)
    }
    return result
}

function threeWay(theirs, mine, agreed) {
    if (theirs === agreed) return mine === DELETED ? 'deletedLocally' : 'localOnly'
    if (mine === agreed) {
        if (theirs === DELETED) return 'conflict' // deleted in the customizer: a person decides
        return mine === DELETED ? 'added' : 'changed'
    }
    return 'conflict'
}

function twoWay(theirs, mine, seen) {
    if (theirs === DELETED) return 'localOnly'
    // Live holds a version git already had, so the local copy is newer.
    if (seen.has(theirs)) return mine === DELETED ? 'deletedLocally' : 'localOnly'
    if (mine === DELETED) return seen.size ? 'conflict' : 'added'
    // Never edited here since it was added: safe to take live. Otherwise both
    // sides may have changed, and a person has to merge.
    return seen.size <= 1 ? 'changed' : 'conflict'
}

// Finds the agreed version of each customizer file (see the top of this file).
// refs maps a path to the commit its base content can be read from, or null
// when the base came from a Live-Merged line.
export function loadBase(root, paths) {
    const tracking = refExists(root, LIVE_REF)
    const base = new Map()
    const refs = new Map()
    for (const commit of logCommits(root, tracking ? `${LIVE_REF}..HEAD` : 'HEAD')) {
        for (const [, path, fp] of `${commit.subject}\n${commit.body}`.matchAll(MERGED)) {
            if (base.has(path)) continue
            base.set(path, fp)
            refs.set(path, null)
        }
        if (!SYNC_SUBJECTS.includes(commit.subject)) continue
        for (const path of commit.files) {
            if (!isCustomizerPath(path) || base.has(path)) continue
            base.set(path, fingerprint(showFile(root, commit.sha, path)))
            refs.set(path, commit.sha)
        }
    }
    if (tracking) {
        for (const path of paths) {
            if (base.has(path)) continue
            base.set(path, fingerprint(showFile(root, LIVE_REF, path)))
            refs.set(path, LIVE_REF)
        }
    }
    return { tracking, base, refs }
}

export function historyOf(root) {
    const cache = new Map()
    return (path) => {
        if (!cache.has(path)) cache.set(path, new Set(pathVersions(root, path).map(fingerprint)))
        return cache.get(path)
    }
}

export function writeLiveFiles(root, live, paths) {
    for (const path of paths) {
        const file = join(root, path)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, live.get(path))
    }
}

// For a conflict: copies the live version (live/<path>) and, when known, the
// agreed base (base/<path>) into a new temp folder outside the repo, so
// nothing extra can get uploaded. Returns the folder.
export function writeMergeFiles(root, live, paths, refs) {
    const dir = mkdtempSync(join(tmpdir(), 'tsm-merge-'))
    const put = (file, content) => {
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, content)
    }
    for (const path of paths) {
        if (live.has(path)) put(join(dir, 'live', path), live.get(path))
        const ref = refs.get(path)
        const content = ref ? showFile(root, ref, path) : null
        if (content !== null) put(join(dir, 'base', path), content)
    }
    return dir
}
