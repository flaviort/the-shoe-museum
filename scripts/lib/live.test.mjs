import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { git } from './git.mjs'
import {
    compareLive, readThemeJson, writeLiveFiles, fingerprint, cliError,
    isCustomizerPath, findConflictMarkers, loadBase, historyOf, writeMergeFiles, SYNC_SUBJECT,
} from './live.mjs'

const map = (obj) => new Map(Object.entries(obj))
// Base as the scripts build it: path -> fingerprint, null meaning "not there".
const base = (obj) => new Map(Object.entries(obj).map(([k, v]) => [k, fingerprint(v)]))
const none = { changed: [], added: [], conflict: [], deletedLocally: [], localOnly: [], skippedDirty: [] }
const P = 'templates/index.json'

function compare({ live = {}, local = {}, at = null, dirty = [], history = {} }) {
    return compareLive({
        live: map(live),
        local: map(local),
        base: at === null ? null : base(at),
        dirty: new Set(dirty),
        history: (path) => new Set((history[path] || []).map(fingerprint)),
    })
}

// Three-way, base known

test('identical files produce no differences', () => {
    assert.deepEqual(compare({ live: { [P]: '{}' }, local: { [P]: '{}' }, at: { [P]: 'old' } }), none)
})

test('line endings and trailing whitespace do not count as changes', () => {
    const r = compare({
        live: { [P]: '{\r\n  "a": 1\r\n}\r\n' },
        local: { [P]: '{\n  "a": 1\n}' },
        at: { [P]: '{\n  "a": 1\n}\n\n' },
    })
    assert.deepEqual(r, none)
})

test('a local committed edit is kept, never reverted to the live version', () => {
    const r = compare({ live: { [P]: 'base' }, local: { [P]: 'mine' }, at: { [P]: 'base' } })
    assert.deepEqual(r, { ...none, localOnly: [P] })
})

test('a customizer edit is taken when the local copy is untouched', () => {
    const r = compare({ live: { [P]: 'theirs' }, local: { [P]: 'base' }, at: { [P]: 'base' } })
    assert.deepEqual(r, { ...none, changed: [P] })
})

test('an edit on both sides is a conflict', () => {
    const r = compare({ live: { [P]: 'theirs' }, local: { [P]: 'mine' }, at: { [P]: 'base' } })
    assert.deepEqual(r, { ...none, conflict: [P] })
})

test('a file deleted here and untouched on live is a local deletion', () => {
    const r = compare({ live: { [P]: 'base' }, local: {}, at: { [P]: 'base' } })
    assert.deepEqual(r, { ...none, deletedLocally: [P] })
})

test('a file deleted here but edited in the customizer is a conflict', () => {
    const r = compare({ live: { [P]: 'theirs' }, local: {}, at: { [P]: 'base' } })
    assert.deepEqual(r, { ...none, conflict: [P] })
})

test('a file deleted in the customizer is a conflict, not silently re-uploaded', () => {
    const r = compare({ live: {}, local: { [P]: 'base' }, at: { [P]: 'base' } })
    assert.deepEqual(r, { ...none, conflict: [P] })
})

test('a file created in the customizer is added', () => {
    const r = compare({ live: { 'templates/page.new.json': 'x' }, local: {}, at: { 'templates/page.new.json': null } })
    assert.deepEqual(r, { ...none, added: ['templates/page.new.json'] })
})

test('a file created here is local only', () => {
    const r = compare({ live: {}, local: { 'templates/page.mine.json': 'x' }, at: { 'templates/page.mine.json': null } })
    assert.deepEqual(r, { ...none, localOnly: ['templates/page.mine.json'] })
})

test('the same new file created on both sides with different content is a conflict', () => {
    const r = compare({ live: { [P]: 'a' }, local: { [P]: 'b' }, at: { [P]: null } })
    assert.deepEqual(r, { ...none, conflict: [P] })
})

test('a customizer edit to a file with unsaved local edits is skipped', () => {
    const r = compare({ live: { [P]: 'theirs' }, local: { [P]: 'base' }, at: { [P]: 'base' }, dirty: [P] })
    assert.deepEqual(r, { ...none, skippedDirty: [P] })
    const both = compare({ live: { [P]: 'theirs' }, local: { [P]: 'mine' }, at: { [P]: 'base' }, dirty: [P] })
    assert.deepEqual(both, { ...none, skippedDirty: [P] })
})

test('unsaved local edits with an untouched live file raise no warning', () => {
    const r = compare({ live: { [P]: 'base' }, local: { [P]: 'mine' }, at: { [P]: 'base' }, dirty: [P] })
    assert.deepEqual(r, { ...none, localOnly: [P] })
})

// Fallback, no base yet

test('without a base, a live-only file is added', () => {
    const r = compare({ live: { 'templates/page.new.json': 'x' } })
    assert.deepEqual(r, { ...none, added: ['templates/page.new.json'] })
})

test('without a base, a live-only file that git history already had is a local deletion', () => {
    const r = compare({ live: { [P]: 'old' }, history: { [P]: ['old'] } })
    assert.deepEqual(r, { ...none, deletedLocally: [P] })
})

test('without a base, a deleted file whose live copy git never had is a conflict', () => {
    const r = compare({ live: { [P]: 'theirs' }, history: { [P]: ['old'] } })
    assert.deepEqual(r, { ...none, conflict: [P] })
})

test('without a base, a live copy that git already had is stale, so the local edit is kept', () => {
    const r = compare({ live: { [P]: 'old' }, local: { [P]: 'new' }, history: { [P]: ['old', 'new'] } })
    assert.deepEqual(r, { ...none, localOnly: [P] })
})

test('without a base, a file never edited here takes the live version', () => {
    const r = compare({ live: { [P]: 'theirs' }, local: { [P]: 'only' }, history: { [P]: ['only'] } })
    assert.deepEqual(r, { ...none, changed: [P] })
})

test('without a base, a file edited here and changed on live is a conflict', () => {
    const r = compare({ live: { [P]: 'theirs' }, local: { [P]: 'two' }, history: { [P]: ['one', 'two'] } })
    assert.deepEqual(r, { ...none, conflict: [P] })
})

test('without a base, local-only files and unsaved edits behave as before', () => {
    assert.deepEqual(compare({ local: { [P]: 'x' } }), { ...none, localOnly: [P] })
    const r = compare({ live: { [P]: 'theirs' }, local: { [P]: 'mine' }, dirty: [P] })
    assert.deepEqual(r, { ...none, skippedDirty: [P] })
})

test('a path missing from a known base map falls back to the two-way rules', () => {
    const r = compareLive({
        live: map({ [P]: 'theirs', 'config/settings_data.json': 'x' }),
        local: map({ [P]: 'base', 'config/settings_data.json': 'x' }),
        base: new Map(),
        dirty: new Set(),
        history: () => new Set([fingerprint('base')]),
    })
    assert.deepEqual(r, { ...none, changed: [P] })
})

// Helpers

test('fingerprint ignores line endings and trailing whitespace, and marks a missing file', () => {
    assert.equal(fingerprint('a\r\nb\r\n'), fingerprint('a\nb'))
    assert.notEqual(fingerprint('a'), fingerprint('b'))
    assert.equal(fingerprint(null), 'deleted')
    assert.equal(fingerprint(undefined), 'deleted')
    assert.match(fingerprint('a'), /^[0-9a-f]{16}$/)
})

test('isCustomizerPath matches only the files the customizer owns', () => {
    for (const p of ['templates/index.json', 'config/settings_data.json', 'locales/en.default.json', 'sections/header-group.json']) {
        assert.equal(isCustomizerPath(p), true, p)
    }
    for (const p of ['templates/customers/login.json', 'templates/list-collections.liquid', 'config/settings_schema.json',
        'locales/en.default.schema.json', 'sections/header.liquid', 'snippets/a.json']) {
        assert.equal(isCustomizerPath(p), false, p)
    }
})

test('cliError drops box drawing and blank lines and keeps the last meaningful lines', () => {
    const text = '╭─ error ──────────────╮\n│                      │\n│  Not authorized.     │\n│  Run shopify login.  │\n│                      │\n╰──────────────────────╯\n\n'
    assert.equal(cliError(text), 'Not authorized. Run shopify login.')
    assert.equal(cliError('one\ntwo\nthree\n'), 'two three')
    assert.equal(cliError('──────\n\n'), '')
})

test('readThemeJson and writeLiveFiles round-trip the customizer files only', () => {
    const dir = mkdtempSync(join(tmpdir(), 'tsm-live-'))
    const out = mkdtempSync(join(tmpdir(), 'tsm-out-'))
    try {
        mkdirSync(join(dir, 'templates/customers'), { recursive: true })
        mkdirSync(join(dir, 'config'))
        mkdirSync(join(dir, 'locales'))
        mkdirSync(join(dir, 'sections'))
        writeFileSync(join(dir, 'templates/index.json'), 'i')
        writeFileSync(join(dir, 'templates/list-collections.liquid'), 'l')
        writeFileSync(join(dir, 'templates/customers/login.json'), 'c')
        writeFileSync(join(dir, 'config/settings_data.json'), 's')
        writeFileSync(join(dir, 'config/settings_schema.json'), 'x')
        writeFileSync(join(dir, 'locales/en.default.json'), 'e')
        writeFileSync(join(dir, 'locales/en.default.schema.json'), 'x')
        writeFileSync(join(dir, 'sections/header-group.json'), 'h')
        writeFileSync(join(dir, 'sections/header.liquid'), 'x')

        const files = readThemeJson(dir)
        assert.deepEqual([...files.keys()].sort(), [
            'config/settings_data.json',
            'locales/en.default.json',
            'sections/header-group.json',
            'templates/index.json',
        ])

        writeLiveFiles(out, files, ['templates/index.json'])
        assert.equal(readFileSync(join(out, 'templates/index.json'), 'utf8'), 'i')
    } finally {
        rmSync(dir, { recursive: true, force: true })
        rmSync(out, { recursive: true, force: true })
    }
})

// The whole loop against a real git repo

function tempRepo() {
    const root = mkdtempSync(join(tmpdir(), 'tsm-base-'))
    git(root, 'init', '-q', '-b', 'main')
    git(root, 'config', 'user.email', 'test@example.com')
    git(root, 'config', 'user.name', 'Test')
    git(root, 'config', 'commit.gpgsign', 'false')
    mkdirSync(join(root, 'templates'))
    return root
}

function save(root, content, message, ...extra) {
    writeFileSync(join(root, P), content)
    git(root, 'add', P)
    return git(root, 'commit', '-q', '-m', message, ...extra.flatMap((m) => ['-m', m]))
}

function check(root, liveContent) {
    const live = map({ [P]: liveContent })
    const local = readThemeJson(root)
    const { base } = loadBase(root, [P])
    return compareLive({ live, local, base, dirty: new Set(), history: historyOf(root) })
}

test('loadBase uses the published version when nothing was synced since', () => {
    const root = tempRepo()
    try {
        save(root, 'published', 'publish')
        git(root, 'update-ref', 'refs/remotes/origin/live', 'HEAD')
        save(root, 'mine', 'code edit')
        const { tracking, base, refs } = loadBase(root, [P, 'templates/page.x.json'])
        assert.equal(tracking, true)
        assert.equal(base.get(P), fingerprint('published'))
        assert.equal(base.get('templates/page.x.json'), 'deleted')
        assert.equal(refs.get(P), 'origin/live')
        assert.deepEqual(check(root, 'published'), { ...none, localOnly: [P] })
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('after dev syncs a customizer edit, a later code edit is kept, not a conflict', () => {
    const root = tempRepo()
    try {
        save(root, 'published', 'publish')
        git(root, 'update-ref', 'refs/remotes/origin/live', 'HEAD')
        save(root, 'customizer', SYNC_SUBJECT)
        save(root, 'customizer plus code', 'code edit')
        assert.deepEqual(check(root, 'customizer'), { ...none, localOnly: [P] })
        assert.deepEqual(check(root, 'customizer again'), { ...none, conflict: [P] })
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('a merge committed with the Live-Merged line clears the conflict until live changes again', () => {
    const root = tempRepo()
    try {
        save(root, 'published', 'publish')
        git(root, 'update-ref', 'refs/remotes/origin/live', 'HEAD')
        save(root, 'mine', 'code edit')
        assert.deepEqual(check(root, 'theirs'), { ...none, conflict: [P] })

        save(root, 'mine and theirs', 'Merge customizer changes from live', `Live-Merged: ${P} ${fingerprint('theirs')}`)
        assert.deepEqual(check(root, 'theirs'), { ...none, localOnly: [P] })
        assert.deepEqual(check(root, 'theirs, edited again'), { ...none, conflict: [P] })
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('a Live-Merged line wins over the content of a sync commit', () => {
    const root = tempRepo()
    try {
        save(root, 'published', 'publish')
        git(root, 'update-ref', 'refs/remotes/origin/live', 'HEAD')
        save(root, 'merged', SYNC_SUBJECT, `Live-Merged: ${P} ${fingerprint('theirs')}`)
        assert.deepEqual(check(root, 'theirs'), { ...none, localOnly: [P] })
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('before the first publish, sync commits still give a base and other files fall back', () => {
    const root = tempRepo()
    try {
        save(root, 'start', 'add template')
        save(root, 'synced', SYNC_SUBJECT)
        save(root, 'synced plus code', 'code edit')
        const { tracking, base } = loadBase(root, [P, 'config/settings_data.json'])
        assert.equal(tracking, false)
        assert.equal(base.get(P), fingerprint('synced'))
        assert.equal(base.has('config/settings_data.json'), false)
        assert.deepEqual(check(root, 'synced'), { ...none, localOnly: [P] })
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('writeMergeFiles puts the live and base versions in a temp folder, never in the repo', () => {
    const root = tempRepo()
    let dir
    try {
        save(root, 'published', 'publish')
        git(root, 'update-ref', 'refs/remotes/origin/live', 'HEAD')
        save(root, 'mine', 'code edit')
        const { refs } = loadBase(root, [P])
        dir = writeMergeFiles(root, map({ [P]: 'theirs' }), [P], refs)
        assert.ok(!dir.startsWith(root))
        assert.equal(readFileSync(join(dir, 'live', P), 'utf8'), 'theirs')
        assert.equal(readFileSync(join(dir, 'base', P), 'utf8'), 'published')
        assert.equal(readFileSync(join(root, P), 'utf8'), 'mine')
        assert.equal(existsSync(join(root, `${P}.live`)), false)
    } finally {
        rmSync(root, { recursive: true, force: true })
        if (dir) rmSync(dir, { recursive: true, force: true })
    }
})

// Merge markers

test('files with any kind of merge marker are listed, sorted', () => {
    const r = findConflictMarkers(map({
        'templates/b.json': '{\n<<<<<<< HEAD\n"a": 1\n}',
        'config/settings_data.json': '{\n"a": 1,\n=======\n"a": 2\n}',
        'sections/c.json': '{\n"a": 1\n>>>>>>> live\n}',
        'templates/ok.json': '{"a": 1}',
    }))
    assert.deepEqual(r, ['config/settings_data.json', 'sections/c.json', 'templates/b.json'])
})

test('clean files return an empty list', () => {
    assert.deepEqual(findConflictMarkers(map({ [P]: '{"a": 1}', 'sections/x.json': '{}' })), [])
})

test('a run of equals signs inside a longer line is not a marker', () => {
    assert.deepEqual(findConflictMarkers(map({ [P]: '{\n"text": "a =======",\n"b": "======= x"\n}' })), [])
})
