# Project Memory Index

- [feedback_push_workflow.md](feedback_push_workflow.md) — npm run push must always pull+build first to avoid overwriting customizer content
- [feedback_shopify_fetch_intercept.md](feedback_shopify_fetch_intercept.md) — Shopify monkey-patches window.fetch; third-party geo APIs 403 as a result
- [project_shopify_setup.md](project_shopify_setup.md) — Shopify theme deploy setup, .shopifyignore rules, and what is/isn't safe to push
- [project_404_template.md](project_404_template.md) — 404 page uses 404.json (not 404.liquid); JSON takes precedence
- [feedback_favicon_settings.md](feedback_favicon_settings.md) — Favicon is customizer-editable via settings_schema.json image_picker; falls back to logo.png
- [feedback_never_edit_compiled_assets.md](feedback_never_edit_compiled_assets.md) — NEVER edit assets/main.js or assets/main.min.css directly; always edit js/ and scss/ source files
