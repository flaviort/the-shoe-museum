import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { compareLive, readThemeJson, writeLiveFiles } from './live.mjs'

const map = (obj) => new Map(Object.entries(obj))
const never = () => false

test('identical files produce no differences', () => {
    const files = map({ 'templates/index.json': '{}' })
    assert.deepEqual(compareLive({ live: files, local: files, dirty: new Set(), wasDeleted: never }), {
        changed: [], added: [], deletedLocally: [], skippedDirty: [],
    })
})

test('line endings and trailing whitespace do not count as changes', () => {
    const r = compareLive({
        live: map({ 'templates/index.json': '{\r\n  "a": 1\r\n}\r\n' }),
        local: map({ 'templates/index.json': '{\n  "a": 1\n}' }),
        dirty: new Set(),
        wasDeleted: never,
    })
    assert.deepEqual(r.changed, [])
})

test('a file edited on live is changed', () => {
    const r = compareLive({
        live: map({ 'config/settings_data.json': 'new' }),
        local: map({ 'config/settings_data.json': 'old' }),
        dirty: new Set(),
        wasDeleted: never,
    })
    assert.deepEqual(r.changed, ['config/settings_data.json'])
})

test('a changed file with local edits is skipped, not overwritten', () => {
    const r = compareLive({
        live: map({ 'templates/index.json': 'live' }),
        local: map({ 'templates/index.json': 'mine' }),
        dirty: new Set(['templates/index.json']),
        wasDeleted: never,
    })
    assert.deepEqual(r.skippedDirty, ['templates/index.json'])
    assert.deepEqual(r.changed, [])
})

test('a live-only file is added unless git history deleted it', () => {
    const r = compareLive({
        live: map({ 'templates/page.new.json': 'x', 'templates/page.old.json': 'y' }),
        local: map({}),
        dirty: new Set(),
        wasDeleted: (p) => p === 'templates/page.old.json',
    })
    assert.deepEqual(r.added, ['templates/page.new.json'])
    assert.deepEqual(r.deletedLocally, ['templates/page.old.json'])
})

test('local-only files are ignored', () => {
    const r = compareLive({
        live: map({}),
        local: map({ 'templates/page.mine.json': 'x' }),
        dirty: new Set(),
        wasDeleted: never,
    })
    assert.deepEqual(r, { changed: [], added: [], deletedLocally: [], skippedDirty: [] })
})

test('readThemeJson and writeLiveFiles round-trip the customizer files only', () => {
    const dir = mkdtempSync(join(tmpdir(), 'tsm-live-'))
    try {
        mkdirSync(join(dir, 'templates/customers'), { recursive: true })
        mkdirSync(join(dir, 'config'))
        writeFileSync(join(dir, 'templates/index.json'), 'i')
        writeFileSync(join(dir, 'templates/list-collections.liquid'), 'l')
        writeFileSync(join(dir, 'templates/customers/login.json'), 'c')
        writeFileSync(join(dir, 'config/settings_data.json'), 's')
        writeFileSync(join(dir, 'config/settings_schema.json'), 'x')

        const files = readThemeJson(dir)
        assert.deepEqual([...files.keys()].sort(), ['config/settings_data.json', 'templates/index.json'])

        const out = mkdtempSync(join(tmpdir(), 'tsm-out-'))
        writeLiveFiles(out, files, ['templates/index.json'])
        assert.equal(readFileSync(join(out, 'templates/index.json'), 'utf8'), 'i')
        rmSync(out, { recursive: true, force: true })
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
})
