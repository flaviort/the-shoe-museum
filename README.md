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

## Image Optimization

The build process is ready for image compression. For now, images are copied as-is. 

### Manual Image Compression (Recommended)

For best results similar to TinyPNG/Kraken, use these online tools:

1. **TinyPNG** (https://tinypng.com/) - For PNG and JPG compression
2. **Kraken.io** (https://kraken.io/web-interface) - Multi-format compression
3. **Squoosh** (https://squoosh.app/) - Google's web-based compressor

### Batch Compression

If you have many images, consider:
- **ImageOptim** (Mac) - Drag & drop batch compression
- **TinyPNG API** - For automated workflows
- **Kraken API** - For bulk processing

Simply replace your `assets/img/` files with compressed versions and run `npm run build`.

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
│   ├── img/               # Images (ready for compression)
│   ├── svg/               # SVGs (unchanged)
│   └── videos/            # Videos
├── robots.txt
└── .htaccess
```