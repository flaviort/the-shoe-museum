import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { parsePorcelain, git, dirtyPaths, countCommits, wasDeleted, commitPaths } from './git.mjs'

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
    return root
}

test('commitPaths commits only the given paths, and wasDeleted reads history', () => {
    const root = tempRepo()
    try {
        writeFileSync(join(root, 'a.json'), '1')
        writeFileSync(join(root, 'b.json'), '1')
        assert.equal(commitPaths(root, ['a.json'], 'add a').code, 0)
        assert.deepEqual(dirtyPaths(root), ['b.json'])
        assert.equal(countCommits(root, 'HEAD'), 1)
        assert.equal(countCommits(root, 'HEAD..@{u}'), null)

        assert.equal(wasDeleted(root, 'a.json'), false)
        git(root, 'rm', '-q', 'a.json')
        git(root, 'commit', '-q', '-m', 'remove a')
        assert.equal(wasDeleted(root, 'a.json'), true)
        assert.equal(wasDeleted(root, 'never-existed.json'), false)
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})
