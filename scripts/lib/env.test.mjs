import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseEnv, shopifyArgs, STORE } from './env.mjs'

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

test('shopifyArgs adds the theme token when set', () => {
    assert.deepEqual(shopifyArgs('push', { SHOPIFY_CLI_THEME_TOKEN: 'shptka_1' }), ['--store', STORE, '--password', 'shptka_1'])
})

test('shopifyArgs adds the storefront password only for dev', () => {
    const env = { SHOPIFY_STOREFRONT_PASSWORD: 'secret' }
    assert.deepEqual(shopifyArgs('dev', env), ['--store', STORE, '--store-password', 'secret'])
    assert.deepEqual(shopifyArgs('pull', env), ['--store', STORE])
})
