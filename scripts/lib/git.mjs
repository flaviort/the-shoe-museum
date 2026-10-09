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

export function wasDeleted(root, path) {
    return git(root, 'log', '--diff-filter=D', '--format=%h', '-1', '--', path).stdout.trim() !== ''
}

export function commitPaths(root, paths, message) {
    const add = git(root, 'add', '--', ...paths)
    if (add.code !== 0) return add
    return git(root, 'commit', '-q', '-m', message, '--', ...paths)
}
