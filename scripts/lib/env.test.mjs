import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { parseEnv, loadEnv, shopifyArgs, STORE } from './env.mjs'

test('parseEnv reads keys, skips comments and blanks, strips quotes', () => {
    const env = parseEnv('# comment\n\nA=1\nB = two \nC="three"\nD=\'four\'\nE=\nbroken line\n')
    assert.deepEqual(env, { A: '1', B: 'two', C: 'three', D: 'four', E: '' })
})

test('parseEnv keeps = signs inside values', () => {
    assert.deepEqual(parseEnv('TOKEN=abc=def'), { TOKEN: 'abc=def' })
})

test('shopifyArgs always passes the store', () => {
    assert.deepEqual(shopifyArgs('pull', {}), ['--store', STORE])
})

test('shopifyArgs never puts the theme token on the command line', () => {
    assert.deepEqual(shopifyArgs('push', { SHOPIFY_CLI_THEME_TOKEN: 'shptka_1' }), ['--store', STORE])
})

test('loadEnv exports the theme token to process.env', () => {
    const dir = mkdtempSync(join(tmpdir(), 'env-test-'))
    const previous = process.env.SHOPIFY_CLI_THEME_TOKEN
    delete process.env.SHOPIFY_CLI_THEME_TOKEN
    try {
        writeFileSync(join(dir, '.env'), 'SHOPIFY_CLI_THEME_TOKEN=shptka_test\n')
        loadEnv(dir)
        assert.equal(process.env.SHOPIFY_CLI_THEME_TOKEN, 'shptka_test')
    } finally {
        if (previous === undefined) delete process.env.SHOPIFY_CLI_THEME_TOKEN
        else process.env.SHOPIFY_CLI_THEME_TOKEN = previous
        rmSync(dir, { recursive: true, force: true })
    }
})

test('shopifyArgs adds the storefront password only for dev', () => {
    const env = { SHOPIFY_STOREFRONT_PASSWORD: 'secret' }
    assert.deepEqual(shopifyArgs('dev', env), ['--store', STORE, '--store-password', 'secret'])
    assert.deepEqual(shopifyArgs('pull', env), ['--store', STORE])
})
