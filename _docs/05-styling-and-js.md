# Styling and JavaScript

## SCSS layout

`scss/main.scss` is the only entry:

```scss
@forward 'utils/colors';
@forward 'atoms';
@forward 'components';
@forward 'pages';
@forward 'utils/margins';
```

Each folder has an `_index.scss` that forwards its files.

| Folder | Holds |
|---|---|
| `scss/variables/` | `breakpoints.scss`, `colors.scss`, `fonts.scss` |
| `scss/mixins/` | `buttons`, `gradients`, `texts`, `utilities` (for example `hover-underline`) |
| `scss/variables.scss` | Forwards variables and mixins. Every partial starts with `@use '../variables' as *;` |
| `scss/atoms/` | Base pieces: `global`, `fonts`, `texts` (the `.text-60` style classes), `buttons`, `form`, `containers`, `animations`, `scroll`, `reusable`, `fancybox` |
| `scss/components/` | One file per reusable block: `top-menu`, `fs-menu`, `cart-menu`, `footer`, `exhibit-block`, `product-block`, `accordion`, `newsletter-section`, `popup`, `sponsors-section` and others |
| `scss/pages/` | One file per page: `home`, `exhibits`, `exhibit`, `store`, `product`, `about`, `contact`, `error-404`, `sponsors`, `challenge` |
| `scss/utils/` | `colors` (color helper classes such as `.white`, `.bg-black`), `margins` (spacing classes such as `.mt-1`, `.py-medium`, with breakpoint forms like `.mt-md-1`) |

New partials must be added to the folder's `_index.scss`, or they are not compiled.

Colors (`scss/variables/colors.scss`): `$pure-white #fff`, `$hard-white #f9f9f9`, `$white #f2f1ed`, grays from `$gray-lightest #e4e4e4` to `$gray-darker #222`, `$black #0d0e13`, `$pure-black #000`, `$green #72af59`, `$green-dark #4e7f3c`, `$red #FF3030`. Font: `'Futura PT', sans-serif`, weights `$regular 400`, `$medium 500`, `$bold bold`.

Breakpoints (`scss/variables/breakpoints.scss`) are media query strings used as `@media #{$mq-lg-min} { ... }`:

| Min width | Max width |
|---|---|
| `$mq-xs-min` 421px | `$mq-xs-max` 420px (also `$mq-xxs-max` 360px) |
| `$mq-sm-min` 576px | `$mq-sm-max` 575px |
| `$mq-md-min` 768px | `$mq-md-max` 767px |
| `$mq-lg-min` 993px | `$mq-lg-max` 992px |
| `$mq-xl-min` 1201px | `$mq-xl-max` 1200px |
| `$mq-2xl-min` 1401px | `$mq-2xl-max` 1400px |
| `$mq-3xl-min` 1601px | `$mq-3xl-max` 1600px |

## Naming and markup

Page styles are nested under `#main-content` and a section class. Components use BEM-style names (`exhibit-block__overlay__top__artist`). Utility classes carry the typography, color and spacing, so most markup is classes only. A real example, `sections/error-404-banner.liquid` with `scss/pages/error-404.scss`:

```liquid
<section class="banner-404">
  <img src="{{ 'footprint.svg' | asset_url }}" alt="Footprint" width="300" height="300" class="footprint" />
  <div class="container py-medium">
    <h1 class="text-60 uppercase bold white">Error 404</h1>
  </div>
</section>
```

```scss
@use '../variables' as *;

#main-content {
    .banner-404 {
        overflow: hidden;

        .footprint {
            position: absolute;
            left: 60%;

            @media #{$mq-sm-max} {
                display: none;
            }
        }
    }
}
```

Grid classes (`container`, `row`, `col-md-6`) come from `assets/bootstrap-grid.min.css`. Never write `style="..."` in Liquid; add a class and a rule here instead.

## How CSS and JS are built

`gulpfile.mjs` compiles `scss/main.scss` to `assets/main.min.css` and `js/functions.js` to `assets/main.js`.

- `npm run dev` runs `gulp watch` next to `shopify theme dev`: compiles with source maps and recompiles on save.
- `npm run push` runs `gulp build`: no source maps, heavier minification. The JS build drops `console.log`, `console.info` and `console.warn` calls.
- `npm run sass` (watch) and `npm run js` (one JS compile) exist for single-purpose use.

The output files and their `.map` files are git-ignored and rebuilt on every push. Never edit them.

## Libraries

Loaded from CDNs in `layout/theme.liquid`.

In `<head>`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.4/dist/lenis.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@6.0/dist/fancybox/fancybox.css">
<link rel="stylesheet" href="{{ 'bootstrap-grid.min.css' | asset_url }}">
{{ 'main.min.css' | asset_url | stylesheet_tag }}
```

Before `</body>`:

```html
<script src="https://unpkg.com/lenis@1.3.4/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@6.0/dist/fancybox/fancybox.umd.js"></script>
<script src="https://unpkg.com/lucide@latest"></script>
{{ 'main.js' | asset_url | script_tag }}
```

## `js/functions.js`

One file, about 1200 lines. It registers `ScrollTrigger` and `SplitText` with GSAP, then defines `horizontalLoop` (a GSAP marquee helper), and the helpers `select`, `selectAll`, `selectId`, `vh`, `vw`, `setCookie`, `getCookie`. After the window `load` event and font loading, `waitForFontsAndInit()` calls `initScripts()`, which runs:

| Function | What it does |
|---|---|
| `initLenis` | Smooth scrolling, tied to GSAP's ticker and ScrollTrigger |
| `initClickAndKeyFunctions` | Click and key handlers: anchor scrolling, open and close the fullscreen menu and cart drawer, Esc closes menus, accordions, quantity buttons |
| `initCart` | Cart drawer quantity, remove and subtotal via `/cart/change.js` |
| `initFormBackup` | Copies contact and newsletter submissions to a Google Sheets web app (`sendBeacon`) |
| `initSliders` | Swiper instances (for example `.blog-slider`) |
| `initFancybox` | Binds Fancybox to `[data-fancybox]`; pauses Lenis while open |
| `scrollTriggerAnimations` | GSAP and SplitText scroll animations |
| `initLucide` | `lucide.createIcons()` for `<i data-lucide="...">` |
| `initReadMore` | Toggles `.read-more-wrapper` content |
| `initTopMenu` | Adds `invisible` to `.top-menu` after 100px of scroll, and `scrolling-down` or `scrolling-up` to `body` |
| `showHideGrid` | Shift+G toggles the `.dev-grid` overlay |
| `initNewsletterForm` | Shows the success or error popup after a `?customer_posted=` redirect |
| `initContactForm` | Shows the contact popup from the `window.__contactPosted` and `window.__contactErrors` flags |
| `initFormSending` | Adds `is-sending` to a form on submit |
| `initFiltersToggle` | Mobile filters button on the store page |
| `initStoreToolbar` | Designer filter and sort on the store page, state in the URL |

Add new behavior as a new `init...()` function and call it from `initScripts()`. Do not call third-party APIs with `fetch`; see [gotchas](07-gotchas.md).
