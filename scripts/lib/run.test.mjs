import { test } from 'node:test'
import assert from 'node:assert/strict'
import { run, shellQuote } from './run.mjs'

test('run captures stdout and exit code', () => {
    const r = run('node', ['-e', 'process.stdout.write("hi"); process.exit(3)'])
    assert.equal(r.code, 3)
    assert.equal(r.stdout, 'hi')
})

test('run reports a missing command as a failure instead of throwing', () => {
    const r = run('definitely-not-a-real-command-xyz', [])
    assert.notEqual(r.code, 0)
})

test('shellQuote leaves safe strings alone', () => {
    assert.equal(shellQuote('--store'), '--store')
    assert.equal(shellQuote('the-shoe-museum.myshopify.com'), 'the-shoe-museum.myshopify.com')
})

test('shellQuote wraps strings with special characters', () => {
    assert.equal(shellQuote('a b'), "'a b'")
    assert.equal(shellQuote("it's"), "'it'\\''s'")
    assert.equal(shellQuote('$HOME'), "'$HOME'")
})
