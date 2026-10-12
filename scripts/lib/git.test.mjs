import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
    parsePorcelain, git, dirtyPaths, countCommits, commitPaths,
    showFile, refExists, logCommits, pathVersions,
} from './git.mjs'

test('parsePorcelain keeps the leading status column intact', () => {
    const text = ' M templates/index.json\nM  layout/theme.liquid\n?? scss/new.scss\nR  old.liquid -> sections/new.liquid\n'
    assert.deepEqual(parsePorcelain(text), [
        'templates/index.json',
        'layout/theme.liquid',
        'scss/new.scss',
        'sections/new.liquid',
    ])
})

test('parsePorcelain returns nothing for a clean tree', () => {
    assert.deepEqual(parsePorcelain(''), [])
})

function tempRepo() {
    const root = mkdtempSync(join(tmpdir(), 'tsm-git-'))
    git(root, 'init', '-q', '-b', 'main')
    git(root, 'config', 'user.email', 'test@example.com')
    git(root, 'config', 'user.name', 'Test')
    git(root, 'config', 'commit.gpgsign', 'false')
    return root
}

test('commitPaths commits only the given paths', () => {
    const root = tempRepo()
    try {
        writeFileSync(join(root, 'a.json'), '1')
        writeFileSync(join(root, 'b.json'), '1')
        assert.equal(commitPaths(root, ['a.json'], 'add a').code, 0)
        assert.deepEqual(dirtyPaths(root), ['b.json'])
        assert.equal(countCommits(root, 'HEAD'), 1)
        assert.equal(countCommits(root, 'HEAD..@{u}'), null)
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('showFile reads a file at a ref, or null when it is not there', () => {
    const root = tempRepo()
    try {
        writeFileSync(join(root, 'a.json'), 'first')
        commitPaths(root, ['a.json'], 'add a')
        writeFileSync(join(root, 'a.json'), 'second')
        commitPaths(root, ['a.json'], 'edit a')
        assert.equal(showFile(root, 'HEAD', 'a.json'), 'second')
        assert.equal(showFile(root, 'HEAD~1', 'a.json'), 'first')
        assert.equal(showFile(root, 'HEAD', 'missing.json'), null)
        assert.equal(showFile(root, 'origin/live', 'a.json'), null)
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('refExists tells a real ref from a missing one', () => {
    const root = tempRepo()
    try {
        assert.equal(refExists(root, 'HEAD'), false)
        writeFileSync(join(root, 'a.json'), '1')
        commitPaths(root, ['a.json'], 'add a')
        assert.equal(refExists(root, 'HEAD'), true)
        assert.equal(refExists(root, 'origin/live'), false)
        git(root, 'update-ref', 'refs/remotes/origin/live', 'HEAD')
        assert.equal(refExists(root, 'origin/live'), true)
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('logCommits lists commits newest first with subject, body and files', () => {
    const root = tempRepo()
    try {
        writeFileSync(join(root, 'a.json'), '1')
        commitPaths(root, ['a.json'], 'add a')
        git(root, 'update-ref', 'refs/remotes/origin/live', 'HEAD')
        writeFileSync(join(root, 'b.json'), '1')
        git(root, 'add', 'b.json')
        git(root, 'commit', '-q', '-m', 'add b', '-m', 'Live-Merged: b.json deleted')
        git(root, 'rm', '-q', 'a.json')
        git(root, 'commit', '-q', '-m', 'remove a')

        const all = logCommits(root, 'HEAD')
        assert.deepEqual(all.map((c) => c.subject), ['remove a', 'add b', 'add a'])
        assert.deepEqual(all[0].files, ['a.json'])
        assert.match(all[1].body, /^Live-Merged: b\.json deleted$/m)

        const since = logCommits(root, 'origin/live..HEAD')
        assert.deepEqual(since.map((c) => c.subject), ['remove a', 'add b'])
        assert.deepEqual(logCommits(root, 'nope..HEAD'), [])
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('pathVersions returns every committed version of a file', () => {
    const root = tempRepo()
    try {
        writeFileSync(join(root, 'a.json'), 'one')
        commitPaths(root, ['a.json'], 'add a')
        writeFileSync(join(root, 'a.json'), 'two')
        commitPaths(root, ['a.json'], 'edit a')
        git(root, 'rm', '-q', 'a.json')
        git(root, 'commit', '-q', '-m', 'remove a')
        assert.deepEqual(pathVersions(root, 'a.json').sort(), ['one', 'two'])
        assert.deepEqual(pathVersions(root, 'never.json'), [])
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})
