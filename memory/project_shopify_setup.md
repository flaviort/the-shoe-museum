---
name: Shopify theme deploy setup
description: How the Shopify theme is deployed, what .shopifyignore protects, and the npm scripts
type: project
---

Theme lives in `_shopify/`. Store: `the-shoe-museum.myshopify.com`. Custom domain: `theshoemuseum.com`.

**npm scripts (run from inside `_shopify/`):**
- `npm run dev` — live dev with hot reload (shopify theme dev + gulp watch)
- `npm run push` — pull → build → push (safe deploy)
- `npm run pull` — pull only (get latest live theme)
- `npm run build` — compile SCSS + JS for production
- `npm run sass` — SCSS watch only
- `npm run js` — JS compile only

**`.shopifyignore` protects:**
- `scss/*`, `js/*` — source files, not pushed to Shopify
- `config/settings_data.json` — global customizer settings, never overwritten
- `node_modules/*`, `gulpfile.mjs`, `package.json`, `package-lock.json`, `.DS_Store`

**Why:** `config/settings_data.json` stores all global theme settings edited in the customizer. `templates/*.json` store per-page section content — these are NOT ignored, so pull-first is essential.
