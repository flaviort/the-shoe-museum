# The Shoe Museum

Custom Shopify theme for `the-shoe-museum.myshopify.com` (live at theshoemuseum.com). It mixes editorial content (Exhibits, a blog with handle `exhibits`) with a store. Two people work on it: the store owner, who works only through Claude, and Flávio, the developer. The owner is not technical. You edit the files and run every command for him.

Requires Node 22 or newer (the test script depends on it).

**First time on this Mac, or setup looks incomplete** (no `node_modules`, no `.env`, `node`, `shopify` or `gh` missing, no `origin` remote of his own)? Use the `setup` skill in `.claude/skills/setup/SKILL.md` before anything else. It also handles "configure this project for me" and "check my setup".

## The two commands

Always run commands from the repo root, and only through npm scripts.

| Command | What it does |
|---|---|
| `npm run dev` | Checks tools, pulls the latest code from GitHub, then copies customizer changes from the live theme and commits them as `sync: customizer changes from live`. It sends that commit to GitHub only when nothing else is waiting to be published; otherwise it goes with the next publish. A file changed both here and in the customizer is left alone with a `[warn]`. Then it starts the local preview (`shopify theme dev` plus `gulp watch`). It never blocks on git state: problems show up as `[warn]` lines and the preview still starts. It runs until stopped, so start it in the background at the start of every session. |
| `npm run push` | Publishes to the live site. Strict: stops if there are uncommitted changes, if GitHub has newer commits, or if the customizer changed on live since the last sync. Then it builds, pushes to GitHub, uploads the theme with `shopify theme push --live --allow-live`, saves Shopify's reformatted JSON, and moves the `live` branch on GitHub to what it just published. |

`npm run push -- --dry-run` runs every check and the build without pushing. Use it to answer "is this ready?". `build`, `sass`, `js` and `test` exist for internal use.

## Session routine

1. Start `npm run dev` in the background. Read its output and report any `[warn]` line in plain language.
2. Make the change. Commit after each logical change with a plain-language message.
3. Tell the owner what changed and which page to check in the preview: `http://127.0.0.1:9292` plus the path.
4. Before `npm run push`, run `npm run push -- --dry-run`. Then ask the owner in chat: "Ready to publish to the live site?" and wait for a yes. Every push goes live immediately.
5. If push stops because of customizer changes, it lists two kinds of file. "Changed only in the customizer": the live version is already in the working copy; check `git diff` and explain it in plain language. "Changed both here and in the customizer": nothing local was touched; the live copy and the common base (the version in `git show origin/live:<path>`, or a newer sync commit) are in the temp folder it prints, and `git merge-file <path> <base copy> <live copy>` merges them. Resolve any `<<<<<<<` markers by hand, keeping both sets of edits. Then run the `git add -A` and `git commit ... -m "Live-Merged: ..."` lines it prints, exactly, and push again. The `Live-Merged` lines tell the next push which live version is already merged; without them it stops again. Never discard live customizer content.

## Hard rules

- Never run `shopify theme push`, `shopify theme pull` or `shopify theme publish` directly. Only `npm run push`.
- Never `git push --force`, never rewrite history, never `git reset --hard` on shared commits.
- Never edit `assets/main.min.css` or `assets/main.js`. They are build output and git-ignored. Edit `scss/` and `js/functions.js`.
- Never use inline `style="..."`. Add a class and write the rule in `scss/` (page styles go in `scss/pages/<page>.scss`).
- `templates/*.json`, `sections/*.json`, `locales/*.json` (not the `.schema.json` files) and `config/settings_data.json` hold customizer content. Edit them only after `npm run dev` has synced in this session, and prefer the customizer for content changes.
- The `live` branch on GitHub marks the commit last published to the live theme. Only `npm run push` moves it. Never move it by hand, never delete it, never commit to it.
- Never write a commit message starting with `sync:` yourself. The scripts use those to record the exact live version of a file.
- Never call third-party APIs with `fetch` from theme JS. Shopify wraps `fetch`; see `_docs/07-gotchas.md`.
- Content (products, exhibits, designers, pages, menus) is edited in Shopify admin, not in code. When that is the right place, point the owner to admin.
- Never read, print or commit `.env`. It holds secrets.

## Talking to the owner

Use plain language and skip jargon. Say what changed and where to look. Ask before anything that goes live. If something fails, say what happened and what you will do next.

## Writing style

No em dashes, no emojis, human voice. This applies to all text you write: copy, code comments, commit messages and docs.

## Where things are

| Path | What lives there |
|---|---|
| `layout/theme.liquid` | Page shell: head, CDN libraries, header and footer sections |
| `sections/` | Page sections with customizer schemas |
| `snippets/` | Reusable partials (cart drawer, fullscreen menu, product and exhibit cards) |
| `templates/` | JSON templates (customizer content) and a few Liquid ones |
| `config/settings_schema.json` | Global theme settings |
| `scss/` | Styles: `atoms`, `components`, `pages`, `variables`, `mixins`, `utils`. Entry is `scss/main.scss` |
| `js/functions.js` | All theme JS |
| `assets/` | Fonts, images, and the git-ignored build output |
| `scripts/` | The code behind `npm run dev` and `npm run push` |
| `_docs/` | Longer documentation |

## Docs index

- `_docs/01-setup.md`: first-time setup on a new machine.
- `_docs/02-daily-workflow.md`: how a normal working day goes, including conflicts with the customizer.
- `_docs/03-architecture.md`: template and section mapping, navigation, global settings. Read before adding pages or sections.
- `_docs/04-content-model.md`: metafields, the designer metaobject, blog and product fields. Read before touching anything that reads metafields.
- `_docs/05-styling-and-js.md`: SCSS structure, the JS libraries and how they load. Read before styling or scripting.
- `_docs/06-patterns.md`: recipes for common changes.
- `_docs/07-gotchas.md`: known traps, including the `fetch` issue. Read when something behaves oddly.
- `_docs/08-troubleshooting.md`: error messages and fixes. Read when a command fails.
