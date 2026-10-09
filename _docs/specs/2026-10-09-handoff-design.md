# Client handoff: repo structure, sync/deploy workflow, docs

Date: 2026-10-09
Status: approved design, pending implementation plan

## Goal

Hand the Shopify theme to the store owner so he can work on it through Claude, while Flávio keeps working on it too. The owner is not technical: Claude edits files and runs every command for him. Both people push to the same live theme, so the workflow must make it hard to overwrite each other's work or the owner's customizer edits.

## Decisions

| Topic | Decision |
|---|---|
| Who works on it | Shared: owner (via Claude) and Flávio |
| Owner's skill level | Non-technical, Claude drives |
| Where changes go | Straight to the live theme, no staging theme |
| Legacy PHP site | Deleted from the repo (git history keeps it) |
| GitHub | Repo transferred to the owner's account, Flávio added as collaborator |
| Mechanism | Guarded npm scripts plus strict CLAUDE.md rules (not the Shopify GitHub integration) |
| Commands | Only two for daily use: `npm run dev` and `npm run push` |

## 1. Repo structure

The theme moves from `_shopify/` to the repo root.

```
the-shoe-museum/
├── CLAUDE.md
├── README.md
├── _docs/
├── scripts/shop.mjs
├── package.json, package-lock.json, gulpfile.mjs
├── .shopifyignore, .gitignore
├── scss/  js/
├── assets/ config/ layout/ locales/ sections/ snippets/ templates/
└── .shopify/metafields.json
```

Deleted: every PHP file and `components/`, the root `assets/` (PHP site assets), root `gulpfile.mjs`, `package.json`, `package-lock.json`, `vercel.json`, `.htaccess`, `router.php`, `robots.txt`, `out/`, and `memory/` (its content moves into `_docs/07-gotchas.md`).

`.gitignore`:
- `node_modules/`, `.DS_Store`
- Compiled output: `assets/main.min.css`, `assets/main.js`, `assets/*.map`. These are minified single lines that conflict on every merge between two people, and every push rebuilds them.

`.shopifyignore` (files that never upload to Shopify):
- Existing: `scss/*`, `js/*`, `node_modules/*`, `gulpfile.mjs`, `package.json`, `package-lock.json`, `.DS_Store`
- New: `_docs/*`, `scripts/*`, `CLAUDE.md`, `README.md`, `.claude/*`, `.gitignore`, `.shopifyignore`
- Also exclude `assets/*.map`, since source maps should never go live.

## 2. Commands

All commands run from the repo root. Theme targeting uses `--live` (the published theme) instead of the theme name, so renaming the theme does not break anything. Store: `the-shoe-museum.myshopify.com`.

The logic lives in `scripts/shop.mjs` (Node, no extra dependencies), called from `package.json`.

### `npm run dev`

1. Refuse to start if the working tree has uncommitted changes. Print a plain-language message saying so.
2. `git pull --ff-only`. If it cannot fast-forward, stop and explain.
3. Pull `templates/*.json` and `config/settings_data.json` from the live theme.
4. If those files changed, commit them as `sync: customizer changes from live` and `git push`.
5. Start `shopify theme dev` and `gulp watch` together (same as today's `dev`).

### `npm run push`

1. Refuse if the working tree has uncommitted changes.
2. `git fetch`. Refuse if local `main` is behind `origin/main`.
3. Pull `templates/*.json` and `config/settings_data.json` from live. If anything differs from the committed version, stop: someone edited in the customizer since the last sync. Leave the pulled changes in the working tree so Claude can show the diff and merge it with the local edits, then commit and run push again.
4. `gulp build` (production CSS and JS, no source maps).
5. `git push`. If it is rejected because the other person pushed, stop before touching live.
6. `shopify theme push --live --allow-live`.
7. Pull the same JSON files once more. If Shopify reformatted them, commit as `sync: normalize after push` and `git push`, so the next push does not stop on a false alarm.

### Kept, not promoted in the docs

`npm run build`, `npm run sass`, `npm run js`. The old `pull` and `push` scripts are replaced.

### Git conventions

- Everyone works on `main`.
- One commit per logical change, message in plain language.
- Never force-push, never rewrite history.

## 3. CLAUDE.md (root)

Short and rule-heavy, links to `_docs` for detail.

- What the project is: Shopify store, domain `theshoemuseum.com`, two people work on it.
- Session ritual: start with `npm run dev`, commit after each change, ship only with `npm run push`. If push stops on customizer changes, show the diff in plain language and merge, never discard live content.
- Hard rules:
  - Never run raw `shopify theme push` / `shopify theme pull`.
  - Never `git push --force`.
  - Never edit compiled assets (`assets/main.min.css`, `assets/main.js`).
  - No inline `style` attributes; styles go in `scss/`.
  - Never edit `templates/*.json` or `config/settings_data.json` without having synced first in this session.
  - No third-party `fetch` from theme JS.
- Working with a non-technical owner: plain language, confirm before every push since it goes live, say which page changed and give the local preview link.
- Writing style: no em dashes, no emojis, human voice.
- File map and pointers to each `_docs` file.

## 4. `_docs/`

| File | Contents |
|---|---|
| `01-setup.md` | Node, Shopify CLI, GitHub access, clone, `npm install`, Shopify login, opening the folder in Claude. Ends with the handoff checklist. |
| `02-daily-workflow.md` | Dev, edit, preview, push. What each command does, what to do when push stops. Written for the owner, with example phrases to tell Claude. |
| `03-architecture.md` | Template, section, snippet relationships; every page with its sections; how customizer JSON relates to code. |
| `04-content-model.md` | Metafields, the `designer` metaobject, the `exhibits` blog, products, the single store page and filters. What is edited in Shopify admin vs in code. |
| `05-styling-and-js.md` | SCSS structure (atoms, components, pages, variables, mixins), naming patterns, JS libraries and where `js/functions.js` initializes them. |
| `06-patterns.md` | How to add a section, a page template, a customizer setting. Worked example based on an existing section. |
| `07-gotchas.md` | Content from `memory/`: fetch monkey-patching, 404.json, favicon setting, compiled assets, why we pull before push. |
| `08-troubleshooting.md` | CLI login, push stopping, merge conflicts, change not showing, rollback (git revert then push, or Shopify theme library). |

### Handoff checklist (manual steps for Flávio, in `01-setup.md`)

1. Transfer the GitHub repo to the owner.
2. Owner adds Flávio as a collaborator.
3. Owner installs the tools and logs into the Shopify CLI with his owner account.
4. Owner runs `npm run dev` once to confirm everything works.
5. Shut down the Vercel project for the old PHP site, if still running.

## 5. Other updates

- `README.md` rewritten as a short human intro pointing to `_docs`.
- Flávio's local Claude memory for this project updated to match the new structure and commands.

## Out of scope

- Shopify GitHub integration.
- Staging or preview themes.
- Any change to theme features or design.
