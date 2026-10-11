// Optional .env support. SHOPIFY_CLI_THEME_TOKEN lets someone use a Theme Access
// token instead of the browser login. It is handed to the CLI through the
// environment, never as a flag, so it does not show up in command output.
// SHOPIFY_STOREFRONT_PASSWORD gets the local preview past a password-protected
// storefront.

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export const STORE = 'the-shoe-museum.myshopify.com'

export function parseEnv(text) {
    const env = {}
    for (const raw of text.split(/\r?\n/)) {
        const line = raw.trim()
        if (!line || line.startsWith('#')) continue
        const eq = line.indexOf('=')
        if (eq === -1) continue
        let value = line.slice(eq + 1).trim()
        if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1)
        env[line.slice(0, eq).trim()] = value
    }
    return env
}

export function loadEnv(root) {
    const file = join(root, '.env')
    const env = existsSync(file) ? parseEnv(readFileSync(file, 'utf8')) : {}
    if (env.SHOPIFY_CLI_THEME_TOKEN) process.env.SHOPIFY_CLI_THEME_TOKEN = env.SHOPIFY_CLI_THEME_TOKEN
    return env
}

export function shopifyArgs(command, env = {}) {
    const args = ['--store', STORE]
    if (command === 'dev' && env.SHOPIFY_STOREFRONT_PASSWORD) {
        args.push('--store-password', env.SHOPIFY_STOREFRONT_PASSWORD)
    }
    return args
}
