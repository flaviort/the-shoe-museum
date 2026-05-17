---
name: Favicon in Shopify customizer
description: Favicon is an image_picker setting in settings_schema.json; falls back to logo.png asset
type: feedback
---

The favicon is customizer-editable via an `image_picker` setting with id `favicon` in `config/settings_schema.json` under the "Global" section.

**How to apply:** In `layout/theme.liquid`, check `settings.favicon != blank` and use `settings.favicon | image_url: width: 512`. Fall back to `'logo.png' | asset_url` if blank. Shopify's image_url filter handles PNG/JPG/SVG/WebP from the customizer correctly. Raw `.ico` files still need `asset_url` and can't go through the image picker.
