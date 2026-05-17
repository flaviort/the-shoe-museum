---
name: Shopify fetch monkey-patch
description: Shopify's shop_events_listener overrides window.fetch, causing third-party API calls to get 403'd
type: feedback
---

Do not make third-party fetch calls from theme JavaScript on Shopify. Shopify's `shop_events_listener` script monkey-patches `window.fetch` for analytics tracking. This modified fetch adds headers that cause external APIs (tested: ipapi.co, ip-api.com, ipwho.is) to return 403 Forbidden.

**Why:** Discovered when trying to add geo-lookup (country/city/IP) to form submissions. Every geolocation API tried returned 403 when called through the Shopify-wrapped fetch. There is no clean workaround without a backend proxy.

**How to apply:** If a feature requires calling a third-party API from the browser, it won't work reliably on Shopify's storefront. Either drop the feature, use a server-side Shopify Function/app proxy, or accept it won't work. The geo-lookup was removed entirely from `initFormBackup` in main.js.
