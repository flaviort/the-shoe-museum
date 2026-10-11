# Patterns

Three recipes, each built on a real file. Run `npm run dev` first so the customizer JSON is in sync.

## 1. Add a new section

Example: `sections/error-404-banner.liquid`, a banner with one editable line.

1. Create `sections/<name>.liquid`. Markup first, then the schema. Name it after the page (`error-404-banner`, `store-grid`).
2. Use only classes, no `style="..."`. Add the styles to the page file in `scss/pages/` (or a new partial forwarded from the folder's `_index.scss`).
3. Give the schema a `name`, settings with defaults, and a `presets` entry. Without `presets`, the section does not appear in the customizer's "Add section" list.

```liquid
<section class="banner-404">
  <div class="container py-medium">
    <h1 class="text-60 uppercase bold white">
      Error 404
    </h1>
    <div class="row mt-half mt-md-1">
      <div class="col-lg-8">
        <p class="text-20 white">
          {{ section.settings.subheading }}
        </p>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "404 Banner",
  "settings": [
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading",
      "default": "Oh no! The page you're looking for doesn't exist."
    }
  ],
  "presets": [
    {
      "name": "404 Banner"
    }
  ]
}
{% endschema %}
```

(The real file also has the background image and footprint; they are left out here.)

4. Add it to a page, one of two ways:
   - In the customizer: open the page, Add section, pick it. Then `npm run dev` or the next push copies the JSON into git.
   - In code: add it to the template JSON, in `sections` and in `order`.

```json
"sponsors-banner": {
  "type": "sponsors-banner",
  "settings": { "title": "Sponsors" }
},
```

Sections that repeat items use `blocks` (see `faq.liquid` or `about-timeline.liquid`).

## 2. Add a new page template

Example: `templates/page.sponsors.json`.

1. Create `templates/page.<name>.json` with the same comment header as the other templates, then the sections and their order:

```json
{
  "sections": {
    "sponsors-banner": { "type": "sponsors-banner", "settings": { "title": "Sponsors" } },
    "sponsors-grid": { "type": "sponsors-grid", "settings": {} },
    "newsletter": { "type": "newsletter", "settings": {} }
  },
  "order": ["sponsors-banner", "sponsors-grid", "newsletter"]
}
```

2. Create the sections it names (recipe 1), or reuse existing ones such as `newsletter`.
3. Page SCSS is keyed to `<main class="...">`. For `page.<name>` the class is the suffix (`<name>`), set in the `case` block of `layout/theme.liquid`. Write styles under `#main-content` in `scss/pages/<name>.scss` and forward it from `scss/pages/_index.scss`.
4. In Shopify admin, open the page (Online Store > Pages, or create one), set its Theme template to the new one, and save.
5. Add the template to the table in `_docs/03-architecture.md`.

## 3. Add a global customizer setting

Example: the favicon.

1. Add an entry to the "Global" group in `config/settings_schema.json`:

```json
{
  "type": "image_picker",
  "id": "favicon",
  "label": "Favicon",
  "info": "Shown in browser tabs and bookmarks. Accepts PNG, JPG, or SVG. Square images work best (recommended: 32x32 or 512x512px)."
}
```

2. Read it anywhere as `settings.<id>`, with a fallback for when it is empty (`layout/theme.liquid`):

```liquid
{%- if settings.favicon != blank -%}
  <link rel="shortcut icon" href="{{ settings.favicon | image_url: width: 512 }}">
{%- else -%}
  <link rel="shortcut icon" href="{{ 'logo.png' | asset_url }}">
{%- endif -%}
```

3. The value is saved by the customizer into `config/settings_data.json`, which the scripts sync. Do not hand-edit that file unless you have just run `npm run dev`.
4. Add the id to the settings table in `_docs/03-architecture.md`.

## Before you commit

- Styles are in `scss/`, with no inline `style="..."` anywhere.
- Every section schema has a `name` (and `presets` if it should be addable).
- Nothing edited in `assets/main.min.css` or `assets/main.js`.
- No em dashes or emojis in new text.
- You looked at the page in the preview at `http://127.0.0.1:9292`, on a narrow window too.
