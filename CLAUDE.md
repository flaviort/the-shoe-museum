# The Shoe Museum — Project Context

## Overview
A Shopify theme being translated from an existing PHP/SCSS site. The site is a mix of editorial content (Exhibits / blog) and e-commerce (Store / products). The PHP source lives in the root; the Shopify theme lives in `_shopify/`.

---

## Tech Stack

### PHP Source (reference only, do not edit)
- PHP templating with shared components in `/components/`
- SCSS compiled via Gulp to `assets/css/main.min.css`
- JS: Lenis (smooth scroll), GSAP + ScrollTrigger + SplitText, Swiper, Fancybox, Lucide icons
- Build tool: Gulp (`gulpfile.mjs`)

### Shopify Theme (`_shopify/`)
- Liquid templating
- SCSS source in `_shopify/scss/`, compiled by Gulp to `_shopify/assets/main.min.css`
- Same JS libraries as PHP site (loaded via CDN)
- Dev: `npm run dev` inside `_shopify/` (runs `shopify theme dev` + `gulp watch` concurrently)
- Build: `npm run build` (production SCSS, no sourcemaps)
- Store: `the-shoe-museum.myshopify.com`

---

## Site Structure & Shopify Template Mapping

| Page | PHP file | Shopify template | Notes |
|---|---|---|---|
| Home | `index.php` | `templates/index.json` | |
| Exhibits (blog list) | `exhibits.php` | `templates/blog.json` | Blog handle: `exhibits` |
| Exhibit (blog post) | `exhibit.php` | `templates/article.json` | Has designer metafields |
| Store (products) | `store.php` | `templates/collection.json` | Single page with filters |
| Product | `product.php` | `templates/product.json` | Has extra metafields |
| About | `about.php` | `templates/page.about.json` | |
| Contact | `contact.php` | `templates/page.contact.json` | |
| Privacy Policy | `privacy-policy.php` | `templates/page.privacy.json` | |
| Terms of Service | `terms-of-service.php` | `templates/page.terms.json` | |
| 404 | — | `templates/404.liquid` | Simple placeholder, design TBD |

### Account Pages
Using **Shopify Accounts 2.0** — no custom account templates needed. Account icon links to `/account` and Shopify handles all auth UI (login, register, forgot password, dashboard, orders) outside the theme.

### Collections / Store
No individual collection pages. All products live on a single store page (`/collections/all` or similar). Collection URLs like `/collections/shoes` should redirect or filter the main products page with the relevant filter pre-activated.

---

## PHP Components → Shopify Snippets/Sections

| PHP component | Shopify equivalent |
|---|---|
| `components/head.php` | `layout/theme.liquid` (head block) |
| `components/top-menu.php` | `sections/header.liquid` |
| `components/fs-menu.php` | `snippets/menu-fullscreen.liquid` |
| `components/cart-menu.php` | `snippets/cart-drawer.liquid` |
| `components/footer.php` | `sections/footer.liquid` |
| `components/newsletter-section.php` | `sections/newsletter.liquid` |
| `components/exhibit-block.php` | `snippets/exhibit-card.liquid` |
| `components/faq-section.php` | `sections/faq.liquid` |

---

## Global Variables (from `globals.php`)

| Variable | Value |
|---|---|
| `$site_title` | The Shoe Museum, Inc. |
| `$site_desc` | Where Passion fuels Creation, Stories add Meaning, and Wearing becomes Expression. |
| `$email` | info@theshoemuseum.com |

These should live in `config/settings_schema.json` as global theme settings.

---

## Navigation

### Top Menu (sticky bar)
- Logo → home
- Links: Exhibits, Store, About, Contact
- Icons (right side): Cart (opens drawer), Account (`/account`), Hamburger (opens fullscreen menu)

### Fullscreen Menu (overlay)
- Large text links: Exhibits, Store, About, Contact, Cart (button), Login
- Triggered by hamburger icon

---

## Metafields

### Article (Exhibit) Metafields
Namespace: `custom`

| Key | Type | Notes |
|---|---|---|
| `designer_name` | single_line_text_field | |
| `year` | single_line_text_field | |
| `short_description` | single_line_text_field | Shown on exhibit card overlay |
| `designer_photo` | file_reference (image) | |
| `designer_position` | single_line_text_field | |
| `designer_bio` | multi_line_text_field | Shown with read-more toggle |
| `designer_portfolio` | url | Optional |
| `related_product` | product_reference | Links exhibit to a product |
| `designer_socials` | list.metaobject_reference | References `designer_social` metaobject |

### Product Metafields
Namespace: `custom`

| Key | Type | Notes |
|---|---|---|
| `designer_name` | single_line_text_field | Optional |
| `year` | single_line_text_field | |
| `short_description` | single_line_text_field | |
| `product_details` | rich_text_field | HTML area for extra details |
| `exhibit_link` | mixed_reference (article) | Links product back to its exhibit |
| `featured_video` | url | MP4, YouTube or Vimeo URL |

### Metaobject: `designer_social`
Used as a list reference on exhibit articles.

| Field | Type |
|---|---|
| `platform` | single_line_text_field | e.g. `instagram`, `linkedin`, `behance`, `twitter`, `youtube`, `tiktok` |
| `url` | url |

---

## JS Libraries (CDN, loaded in theme.liquid)

```html
<!-- Head -->
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.4/dist/lenis.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@6.0/dist/fancybox/fancybox.css" />

<!-- Footer (before </body>) -->
<script src="https://unpkg.com/lenis@1.3.4/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@6.0/dist/fancybox/fancybox.umd.js"></script>
<script src="https://unpkg.com/lucide@latest"></script>
{{ 'main.js' | asset_url | script_tag }}
```

---

## SEO / Meta Tags (from `head.php`)
Already implemented: charset, viewport, format-detection, favicon, author, title, description, canonical, og:locale, og:type, og:title, og:description, og:url, og:site_name, og:image (1200×630).

Still to add in `theme.liquid`: Twitter/X card meta tags, structured data (JSON-LD).

---

## Notes & Decisions
- No search functionality (for now)
- No pagination (for now, may add later)
- No individual collection pages — single store page with filter support. Collection URLs pre-activate the relevant filter via URL params.
- Password protection disabled on store during development
- `content_for_header` must be present in `theme.liquid` for Shopify scripts/apps to inject correctly
- Customizer-editable content uses section schemas; global settings use `config/settings_schema.json`
