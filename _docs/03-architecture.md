# Architecture

## Folder map

| Path | Purpose |
|---|---|
| `layout/theme.liquid` | Page shell. `layout/password.liquid` is the storefront password page (unused, protection is off). |
| `templates/` | One file per page type. JSON files list sections; `list-collections.liquid` redirects to `/collections/all`. |
| `sections/` | Page blocks with customizer schemas. |
| `snippets/` | Partials called with `render`: `cart-drawer`, `menu-fullscreen`, `exhibit-card`, `product-block`, `payment-icons`. |
| `config/` | `settings_schema.json` (global setting definitions) and `settings_data.json` (their saved values). |
| `locales/en.default.json` | Default locale file. |
| `scss/`, `js/functions.js` | Source for the compiled `assets/main.min.css` and `assets/main.js`. |
| `assets/` | Fonts (Futura PT), images, `bootstrap-grid.min.css`, plus the git-ignored build output. |
| `scripts/` | Code behind `npm run dev` and `npm run push`. |
| `_docs/` | These docs. |

`.shopifyignore` keeps `scss/`, `js/`, `scripts/`, `_docs/`, `.claude/`, `gulpfile.mjs`, package files, `CLAUDE.md`, `README.md`, `.env*` and source maps off the store.

## How a page is built

1. Shopify picks a template from `templates/` (for example `product.json` for a product).
2. The JSON lists sections and their order. Each section is a file in `sections/`.
3. Sections render snippets, for example `{%- render 'exhibit-card', article: article -%}`.
4. `layout/theme.liquid` wraps all of it: head and meta tags, then `<header>` holding `menu-fullscreen` and `cart-drawer`, then `{%- section 'header' -%}`, `{{ content_for_layout }}`, `{%- section 'footer' -%}`, and the scripts.

`<main id="main-content">` gets a class derived from the template name, so the page SCSS (written for the old PHP pages) still applies:

| `template.name` | class |
|---|---|
| `index` | `home` |
| `article` | `exhibit` |
| `blog` | `exhibits` |
| `collection` | `store` |
| `product` | `product` |
| `page` | the template suffix (`about`, `contact`, `privacy`, `sponsors`, `terms`), or `page` |
| `404` | `404` |
| anything else | the template name |

## Templates

`newsletter` is the same section reused on most templates.

| Template | Sections in order | Serves |
|---|---|---|
| `index.json` | `home-banner`, `home-about`, `home-exhibits`, `sponsors`, `newsletter` | `/` |
| `blog.json` | `exhibits-featured`, `exhibits-grid`, `newsletter` | `/blogs/exhibits` |
| `article.json` | `exhibit-main` | an exhibit, `/blogs/exhibits/<handle>` |
| `collection.json` | `store-banner`, `store-grid`, `newsletter` | `/collections/all` and any `/collections/<handle>` |
| `product.json` | `product-main` | `/products/<handle>` |
| `page.about.json` | `about-banner`, `about-timeline`, `newsletter` | a page that uses the "about" template |
| `page.contact.json` | `contact-banner`, `contact-form`, `faq`, `newsletter` | a page that uses the "contact" template |
| `page.privacy.json` | `privacy-banner`, `privacy-content`, `newsletter` | a page that uses the "privacy" template |
| `page.terms.json` | `terms-banner`, `terms-content`, `newsletter` | a page that uses the "terms" template |
| `page.sponsors.json` | `sponsors-banner`, `sponsors-grid`, `newsletter` | a page that uses the "sponsors" template |
| `404.json` | `error-404-banner`, `error-404-exhibits`, `newsletter` | not found |
| `list-collections.liquid` | none, one line of JS redirecting to `/collections/all` | `/collections` |

A `page.<suffix>.json` template only applies once a page in Shopify admin has it selected. The footer links to pages with the handles `privacy-policy` and `terms-of-service`.

## Header, footer, cart drawer, fullscreen menu

- `sections/header.liquid`: logo, menu links, and three icons (cart button `open-cart`, account link to `routes.account_url`, hamburger `open-fs`). Schema: `logo` (falls back to `assets/logo.png`) and `menu` (a `link_list`, default `main-menu`, edited in Online Store > Navigation). A menu link whose URL contains `/collections` gets a dropdown listing every collection.
- `sections/footer.liquid`: logo, links to the privacy and terms pages, year and shop name. Its schema is only `{ "name": "Footer" }`.
- `snippets/cart-drawer.liquid`: server-rendered items, subtotal, checkout link. `initCart()` in `js/functions.js` handles quantity changes and removal through `/cart/change.js`.
- `snippets/menu-fullscreen.liquid`: the overlay the hamburger opens. It gets the header's menu (`menu: sections['header'].settings.menu`), plus a Cart button and an Account link that reads "Login" or "Account" depending on `customer`.

## Global settings

Defined in `config/settings_schema.json`, group "Global". Read them as `settings.<id>`.

| id | Type | Used for |
|---|---|---|
| `site_description` | textarea | Default meta description in `layout/theme.liquid`, then `shop.description` |
| `favicon` | image_picker | Browser tab icon, falls back to `assets/logo.png` |
| `og_image` | image_picker | Default social image for Open Graph and the Twitter card |
| `contact_email` | text | Defined (default `info@theshoemuseum.com`), but no file reads it today |

The shop name comes from `shop.name`, not from a setting.

## Customizer JSON vs code

The Shopify customizer writes `templates/*.json` and `config/settings_data.json` on the live theme. Those are the only files it owns; everything else is code. A push uploads the local copies, so a stale local JSON would erase customizer work. Both scripts therefore pull exactly those files (`LIVE_JSON` in `scripts/lib/live.mjs`) into a temp folder and compare them with the local ones:

- `npm run dev` copies differing files into the working tree, commits them as `sync: customizer changes from live` and pushes that commit. A file with unsaved local edits is skipped with a `[warn]`.
- `npm run push` stops if any file differs, after writing the live versions into the working tree so you can review them with `git diff`, merge and commit.
- After uploading, `push` pulls again, because Shopify reformats JSON on upload, and commits any difference as `sync: normalize after push`.

Every JSON template starts with Shopify's auto-generated comment block. Leave it in.

## Accounts

Shopify customer accounts handle login, registration and orders outside the theme. There are no account templates.

## Store page and collections

There is no per-collection design. `templates/collection.json` serves every collection with the same sections. `sections/store-banner.liquid` shows links to All and to every collection that has products, a designer select and a sort select. `initStoreToolbar()` filters and sorts the grid in the browser and keeps the choice in the URL: `?designer=<designer name as handle>` and `?sort=price-desc|price-asc|name-asc|name-desc`. Each `product-block` carries `data-designer`, `data-price` and `data-name` for that. There is no search and no pagination.
