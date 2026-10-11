# The Shoe Museum

Custom Shopify theme for [theshoemuseum.com](https://theshoemuseum.com) (`the-shoe-museum.myshopify.com`). It combines editorial content (Exhibits) with a store. The store owner and the developer both work on it, mostly through Claude.

## Commands

Run these from the repo root. Node 22 or newer is required.

- `npm run dev` gets the latest code and customizer content, then starts the local preview at `http://127.0.0.1:9292`. It keeps running until you press Ctrl+C.
- `npm run push` publishes to the live site after checking git and the live customizer. Everything it pushes is public at once. Add `-- --dry-run` to run the checks and the build without publishing.

## Getting started

New here? Start with [`_docs/01-setup.md`](_docs/01-setup.md).

Working with Claude? It reads `CLAUDE.md` automatically, so there is nothing to explain first.

## Docs

- [`_docs/01-setup.md`](_docs/01-setup.md): first-time setup
- [`_docs/02-daily-workflow.md`](_docs/02-daily-workflow.md): day-to-day routine
- [`_docs/03-architecture.md`](_docs/03-architecture.md): templates, sections, settings
- [`_docs/04-content-model.md`](_docs/04-content-model.md): metafields and metaobjects
- [`_docs/05-styling-and-js.md`](_docs/05-styling-and-js.md): SCSS and JavaScript
- [`_docs/06-patterns.md`](_docs/06-patterns.md): recipes for common changes
- [`_docs/07-gotchas.md`](_docs/07-gotchas.md): known traps
- [`_docs/08-troubleshooting.md`](_docs/08-troubleshooting.md): errors and fixes
