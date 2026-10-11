# Content model

Content lives in Shopify admin. The theme only reads it. The definitions below come from `.shopify/metafields.json` (git-ignored; refresh it with `shopify theme metafields pull`) and are checked against how the sections use them.

## Exhibits

Exhibits are articles in the blog with handle `exhibits` (`blogs['exhibits']`). Article metafields, namespace `custom`:

| Key | Type | Used by |
|---|---|---|
| `designer` | metaobject_reference (`designer`) | `exhibit-card`, `exhibit-main`, `exhibits-featured` |
| `year` | single_line_text_field | `exhibit-card`, `exhibit-main` |
| `product` | product_reference | `exhibit-main` (link and buy button to the product) |
| `featured_big_image` | file_reference | `exhibits-featured`: hero image, only when the exhibit is the featured one. Falls back to `featured.image` |
| `featured_video` | url | `exhibit-main`: YouTube, Vimeo or a Files-hosted `.mp4` |
| `video_text` | multi_line_text_field | `exhibit-main` |
| `ideation_sketches` | list.file_reference | `exhibit-main` sketch gallery |
| `ideation_text` | multi_line_text_field | `exhibit-main` |
| `inspiration` | list.metaobject_reference | `exhibit-main` inspiration grid (each entry has `title`, `text`, `image`) |
| `inspiration_text` | multi_line_text_field | `exhibit-main` |

The card's short description is `article.excerpt`, not a metafield. In `inspiration` entries the title follows "Post Name | Custom Title" and only the part after the last `|` is shown.

Access pattern (from `sections/exhibit-main.liquid`):

```liquid
{%- assign designer          = article.metafields.custom.designer.value -%}
{%- assign year              = article.metafields.custom.year.value -%}
{%- assign related_product   = article.metafields.custom.product.value -%}
{%- assign ideation_sketches = article.metafields.custom.ideation_sketches.value -%}
{%- assign featured_video    = article.metafields.custom.featured_video.value -%}
{%- assign inspiration       = article.metafields.custom.inspiration.value -%}
```

## Metaobject: designer

Referenced by exhibits and products. Fields read by the theme:

| Key | Type |
|---|---|
| `name` | single_line_text_field |
| `title` | single_line_text_field |
| `bio` | multi_line_text_field |
| `photo` | file_reference (image) |
| `website`, `instagram`, `linkedin`, `facebook`, `twitter` | url |

```liquid
{{ designer.name }}
{{ designer.title }}
{{ designer.photo | image_url: width: 300 }}
```

Every field is wrapped in `{%- if designer.<key> != blank -%}`, so empty ones are skipped.

## Metaobject: sponsors

`sections/sponsors.liquid` and `sections/sponsors-grid.liquid` loop over `shop.metaobjects.sponsors.values`. Each entry has `logo`, `label` and `url`:

```liquid
{%- assign sponsor_entries = shop.metaobjects.sponsors.values -%}
{%- assign logo  = entry.logo.value -%}
{%- assign label = entry.label.value -%}
{%- assign url   = entry.url.value -%}
```

The `sponsors` section also has its own `sponsor` blocks in the customizer (`logo`, `label`, `url`).

## Products

Namespace `product`:

| Key | Type | Used by |
|---|---|---|
| `designer_name` | mixed_reference | Shown under the title as "Designer"; read as `.value.name` in `product-main`, `product-block`, `store-banner` (designer filter) |
| `product_details` | rich_text_field | Second tab in `product-main`, printed with `metafield_tag` |
| `exhibit_link` | article_reference | "Exhibit" link in `product-main` |
| `featured_video` | url | Video block in `product-main` |

```liquid
{%- assign designer        = product.metafields.product.designer_name.value -%}
{%- assign product_details = product.metafields.product.product_details -%}
{%- assign exhibit_article = product.metafields.product.exhibit_link.value -%}
{%- assign featured_video  = product.metafields.product.featured_video.value -%}
```

Product tags are all shown as badges on `product-block`. Nothing in the theme reads a product `year` or `short_description` metafield; neither is defined in `.shopify/metafields.json`.

## Where to edit what

| Thing | Where in Shopify admin |
|---|---|
| Exhibit text, image, excerpt, metafields | Content > Blog posts (blog "Exhibits") |
| Designers, sponsors, inspiration entries | Content > Metaobjects |
| Products, prices, tags, product metafields | Products |
| Files used by metafields and videos | Content > Files |
| Menu links | Online Store > Navigation |
| Page text on About, Contact, Privacy, Terms, Sponsors | Customizer (Online Store > Themes > Customize); the page itself must use the matching template |
| Headings, banners, buttons, FAQ, timeline | Customizer |
| Favicon, social image, site description | Customizer > Theme settings > Global |
