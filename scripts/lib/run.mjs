// Thin wrapper over spawnSync that never throws: a missing command or a
// timeout comes back as a non-zero code so callers can print a friendly line.

import { spawnSync } from 'node:child_process'

export function run(cmd, args, { cwd, live = false, timeout } = {}) {
    const r = spawnSync(cmd, args, {
        cwd,
        timeout,
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
        stdio: live ? 'inherit' : 'pipe',
    })
    return {
        code: r.status ?? 1,
        stdout: r.stdout ?? '',
        stderr: (r.stderr ?? '') + (r.error ? r.error.message : ''),
    }
}

export function shellQuote(s) {
    return /^[\w@%+=:,./-]+$/.test(s) ? s : `'${s.replace(/'/g, `'\\''`)}'`
}
