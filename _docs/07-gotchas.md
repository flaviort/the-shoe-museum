# Gotchas

## Shopify wraps `fetch`, so third-party APIs fail

Shopify's `shop_events_listener` script replaces `window.fetch` to track analytics. Calls to external APIs made through that wrapper come back `403 Forbidden`. It was tested with ipapi.co, ip-api.com and ipwho.is while adding a country and city lookup to form submissions. All three failed, and there is no clean workaround without a backend proxy.

So do not call third-party APIs with `fetch` from theme JS. Either drop the feature, use a Shopify app proxy or Function, or accept that it will not work. The geo lookup was removed from `initFormBackup()`. Same-origin calls such as `/cart/change.js` and `/cart/add.js` are fine. `initFormBackup()` sends its data to Google Sheets with `navigator.sendBeacon`, and only falls back to `fetch` with `mode: 'no-cors'` when `sendBeacon` is missing.

## The 404 page is `templates/404.json`

The 404 page is a JSON template with sections, like every other page: `error-404-banner`, `error-404-exhibits` and `newsletter`. The old `404.liquid` was deleted. If both existed Shopify would prefer the JSON, so do not add a Liquid one back. `error-404-exhibits` shows the latest three articles of the `exhibits` blog, and renders nothing when that blog has no articles.

## The favicon is a customizer setting

`settings.favicon` is an `image_picker` in `config/settings_schema.json`. `layout/theme.liquid` uses it when set and falls back to `assets/logo.png`. The image picker takes PNG, JPG, SVG and WebP, but not `.ico`; a raw `.ico` would have to go through `asset_url`. To change the icon, use the customizer (Theme settings > Global), not the code.

## Never edit compiled assets

`assets/main.min.css` and `assets/main.js` are build output, rebuilt from `scss/main.scss` and `js/functions.js` by `gulp watch` in dev and `gulp build` on every push. Edits to them vanish silently, and they are git-ignored anyway. Edit the sources.

## Customizer JSON must be pulled before it is pushed

Shopify stores customizer content (section settings, block order, page content) in `templates/*.json` and `config/settings_data.json` on the live theme. Uploading a stale local copy of those files overwrites everything the owner did in the customizer, with no undo. That is why both commands sync them first:

- `npm run dev` brings live changes into git before you start editing.
- `npm run push` refuses to publish if live has changes it has not synced, and writes them into your working tree so you can merge.

Pull only those files, never the whole theme. A full `shopify theme pull` replaces local code with the live theme's older code. This is why the scripts compare in a temp folder and copy files themselves, and why you should never run `shopify theme pull` or `push` by hand.

Shopify also reformats JSON on upload, so the scripts re-pull after each push and commit the reformatted version (`sync: normalize after push`). A customizer-change stop right after a push is usually only formatting.

## Small ones

- `.shopifyignore` excludes source, tooling and docs from the upload, not `config/settings_data.json`. That file is uploaded, which is safe because of the sync above.
- `snippets/cart-drawer.liquid` and `snippets/menu-fullscreen.liquid` start hidden with an inline `style="display: none"` that the JS toggles. It is the one place inline styles remain; do not copy it.
- Product `designer_name` is defined as a `mixed_reference` but the theme reads `.value.name`, so it must point at a `designer` metaobject entry.
- Contact and newsletter forms use Shopify's `{% form 'contact' %}` and `{% form 'customer' %}`. Their success and error popups come from a `?customer_posted=` URL parameter and from `window.__contactPosted` and `window.__contactErrors`, handled in `initNewsletterForm()` and `initContactForm()`.
