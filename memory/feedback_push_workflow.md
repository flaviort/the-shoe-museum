---
name: Shopify push workflow
description: npm run push must pull first then rebuild before pushing to avoid overwriting live customizer content
type: feedback
---

Always pull from live theme before pushing, then rebuild compiled assets. The correct sequence is: pull → build → push.

**Why:** Shopify stores customizer content (section settings, block order, etc.) in `templates/*.json` on the live theme. Running `shopify theme push` without pulling first overwrites those files with stale local versions, destroying all customizer work. Additionally, `shopify theme pull` can overwrite locally-compiled assets (main.min.css, main.js) with older live versions, so a rebuild step is needed after pull.

**How to apply:** `npm run push` in `_shopify/` is already configured as `pull && gulp build && push`. Never run raw `shopify theme push` directly. If adding new npm scripts that deploy, follow the same pattern.
