# The Shoe Museum

## Development

```bash
npm run dev    # Start development with PHP + live reload
npm run build  # Build production-ready static site
```

## Build Process

The build process creates a fully optimized static website in the `out` folder:

- ✅ **PHP → Static HTML** - Converts PHP files to static HTML with all includes resolved
- ✅ **SCSS → Minified CSS** - Compiles and minifies stylesheets
- ✅ **JS Minification** - Optimizes JavaScript with aggressive compression
- ✅ **HTML Minification** - Removes whitespace, comments, and redundant attributes
- ✅ **Asset Organization** - Copies all necessary files for deployment

## Image Handling

Images are copied directly from `assets/img/` to `out/assets/img/` without any processing.

### Image Optimization (Optional)

For better performance, optimize images before adding them to `assets/img/`:

1. **TinyPNG** (https://tinypng.com/) - For PNG and JPG compression
2. **Kraken.io** (https://kraken.io/web-interface) - Multi-format compression  
3. **Squoosh** (https://squoosh.app/) - Google's web-based compressor
4. **ImageOptim** (Mac) - Drag & drop batch compression

Simply replace files in `assets/img/` with optimized versions, then run `npm run build`.

## Deployment

The `out` folder contains everything needed for production:
- Static HTML files (no PHP server required)
- Minified CSS and JavaScript
- All images and assets
- Configuration files

Can be deployed to:
- Static hosting (Netlify, Vercel, GitHub Pages)
- CDN (CloudFlare, AWS S3)
- Any web server

## File Structure

```
out/
├── index.html              # Static HTML
├── assets/
│   ├── css/main.min.css   # Minified CSS
│   ├── js/functions.min.js # Minified JS
│   ├── img/               # Images (copied as-is)
│   ├── svg/               # SVGs
│   └── videos/            # Videos
├── robots.txt
└── .htaccess
```