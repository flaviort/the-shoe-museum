// Git helpers for dev.mjs and push.mjs. Everything goes through run(), so a
// failure comes back as a result object instead of an exception.

import { run } from './run.mjs'

// Porcelain lines look like "XY path". The first column can be a space, so
// the text must not be trimmed before slicing.
export function parsePorcelain(text) {
    return text
        .split('\n')
        .filter(Boolean)
        .map((line) => {
            const path = line.slice(3)
            const arrow = path.indexOf(' -> ')
            return (arrow === -1 ? path : path.slice(arrow + 4)).replace(/^"|"$/g, '')
        })
}

export function git(root, ...args) {
    return run('git', args, { cwd: root })
}

export function dirtyPaths(root) {
    return parsePorcelain(git(root, 'status', '--porcelain=v1', '--untracked-files=all').stdout)
}

export function countCommits(root, range) {
    const r = git(root, 'rev-list', '--count', range)
    return r.code === 0 ? Number(r.stdout.trim()) : null
}

// File content at a ref, or null when the ref or the file does not exist.
export function showFile(root, ref, path) {
    const r = git(root, 'show', `${ref}:${path}`)
    return r.code === 0 ? r.stdout : null
}

export function refExists(root, ref) {
    return git(root, 'rev-parse', '--verify', '-q', `${ref}^{commit}`).code === 0
}

// Commits in a range, newest first, each with its subject, body and the files
// it touched. An unknown range gives an empty list.
export function logCommits(root, range) {
    const r = git(root, 'log', '--no-renames', '--name-only', '--format=%x1e%H%x1f%s%x1f%b%x1f', range, '--')
    if (r.code !== 0) return []
    return r.stdout
        .split('\x1e')
        .filter(Boolean)
        .map((chunk) => {
            const [sha, subject, body, names] = chunk.split('\x1f')
            return { sha, subject, body: body.trim(), files: names.split('\n').filter(Boolean) }
        })
}

// Every committed version of a file reachable from HEAD, oldest first.
export function pathVersions(root, path) {
    const r = git(root, 'log', '--reverse', '--format=%H', 'HEAD', '--', path)
    if (r.code !== 0) return []
    return r.stdout
        .split('\n')
        .filter(Boolean)
        .map((sha) => showFile(root, sha, path))
        .filter((content) => content !== null)
}

export function commitPaths(root, paths, message) {
    const add = git(root, 'add', '--', ...paths)
    if (add.code !== 0) return add
    return git(root, 'commit', '-q', '-m', message, '--', ...paths)
}
