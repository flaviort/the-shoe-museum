---
name: 404 template setup
description: The 404 page uses templates/404.json with two custom sections; the old 404.liquid was deleted
type: project
---

The 404 page uses `templates/404.json` (not `404.liquid`, which was deleted). Shopify gives JSON templates priority over liquid when both exist, but since 404.liquid was deleted there's no ambiguity.

**Sections used:**
- `sections/error-404-banner.liquid` — banner with banner.jpg + footprint.svg, "Error 404" heading, customizer-editable subheading
- `sections/error-404-exhibits.liquid` — shows last 3 articles from the `exhibits` blog; entire section is suppressed if `exhibit_blog.articles_count == 0`
- `sections/newsletter.liquid` — shared newsletter section

**Why:** Followed the same JSON + sections pattern used by all other pages (page.about.json, etc.) for consistency and customizer editability.
