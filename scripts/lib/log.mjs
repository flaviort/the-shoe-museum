// Checklist-style output shared by dev.mjs and push.mjs, one line per check.

const tag = (label) => ` [${label}]`.padEnd(9)

export const ok = (msg) => console.log(`${tag('ok')}${msg}`)
export const info = (msg) => console.log(`${tag('..')}${msg}`)
export const warn = (msg) => console.log(`${tag('warn')}${msg}`)
export const fail = (msg) => console.error(`${tag('ERROR')}${msg}`)

export function title(text) {
    console.log(`\n ${text}\n ${'='.repeat(text.length)}`)
}
