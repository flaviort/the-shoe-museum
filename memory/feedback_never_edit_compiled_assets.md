---
name: Never edit compiled assets directly
description: assets/main.js and assets/main.min.css are compiled outputs — always edit source files in js/ and scss/ instead
type: feedback
---

Never directly edit `_shopify/assets/main.js` or `_shopify/assets/main.min.css`. These are compiled outputs and any direct edits will be overwritten the next time `gulp build` runs.

**Why:** The build pipeline compiles `_shopify/js/functions.js` → `assets/main.js` and `_shopify/scss/main.scss` → `assets/main.min.css`. Editing the compiled files gives a false sense that changes are permanent when they will silently disappear on the next build or push.

**How to apply:** For any JS change, edit `_shopify/js/functions.js`. For any CSS/SCSS change, edit the relevant file under `_shopify/scss/`. Then run `npm run push` (which compiles via `gulp build` before pushing) or `npm run js` / `npm run sass` to compile only.
