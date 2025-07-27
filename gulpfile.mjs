import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as sass from 'sass';
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import browserSync from 'browser-sync'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import path from 'path'
import { fileURLToPath } from 'url'
import { deleteAsync } from 'del'
import through2 from 'through2'
import { spawn } from 'child_process'
import htmlmin from 'gulp-htmlmin'
// Image compression can be added here in the future

const compileSass = gulpSass(sass)
const bs = browserSync.create()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectFolderName = path.basename(__dirname)

// PHP to HTML processor
function phpToHtml() {
    return through2.obj(function(file, enc, callback) {
        if (file.isNull()) {
            return callback(null, file)
        }

        if (file.isStream()) {
            return callback(new Error('Streaming not supported'))
        }

        // Only process .php files that are not in components folder
        if (!file.path.endsWith('.php') || file.path.includes('/components/')) {
            return callback(null, file)
        }

        const relativePath = path.relative(process.cwd(), file.path)
        
        // Use PHP CLI to execute the file and capture output
        const php = spawn('php', [relativePath], {
            cwd: process.cwd(),
            stdio: ['pipe', 'pipe', 'pipe']
        })

        let output = ''
        let error = ''

        php.stdout.on('data', (data) => {
            output += data.toString()
        })

        php.stderr.on('data', (data) => {
            error += data.toString()
        })

        php.on('close', (code) => {
            if (code !== 0) {
                console.error(`PHP Error in ${relativePath}:`, error)
                return callback(new Error(`PHP execution failed for ${relativePath}`))
            }

            // Create new file with .html extension
            const newFile = file.clone()
            newFile.path = file.path.replace('.php', '.html')
            newFile.contents = Buffer.from(output)

            callback(null, newFile)
        })

        php.on('error', (err) => {
            callback(new Error(`Failed to execute PHP: ${err.message}`))
        })
    })
}

// Development tasks (with sourcemaps)
export function compileSassTask() {
    return gulp.src('assets/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(compileSass({
            outputStyle: 'compressed'
        }).on('error', compileSass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'))
        .pipe(bs.stream())
}

export function compileJS() {
    return gulp.src('assets/js/functions.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/js'))
        .pipe(bs.stream())
}

// Production build tasks (no sourcemaps, maximum minification)
export function buildSass() {
    return gulp.src('assets/scss/main.scss')
        .pipe(compileSass({
            outputStyle: 'compressed'
        }).on('error', compileSass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ 
            compatibility: 'ie8',
            level: 2,  // Advanced optimizations
            inline: ['local'],
            rebase: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('out/assets/css'))
}

export function buildJS() {
    return gulp.src('assets/js/functions.js')
        .pipe(uglify({
            compress: {
                drop_console: true,     // Remove console.log statements
                drop_debugger: true,    // Remove debugger statements
                pure_funcs: ['console.log', 'console.info', 'console.warn'], // Remove specific console methods
                passes: 2               // Multiple compression passes
            },
            mangle: {
                toplevel: false,        // Don't mangle top-level to avoid conflicts
                reserved: ['$', 'jQuery', 'lenis', 'gsap', 'ScrollTrigger'] // Reserve common globals
            },
            output: {
                comments: false         // Remove all comments
            }
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('out/assets/js'))
}

// Process PHP files to static HTML with minification
export function buildHTML() {
    return gulp.src([
        '*.php',
        '!components/**/*.php',  // Exclude component files
        '!out/**/*.php',         // Exclude output files
        '!.tmp/**/*.php'         // Exclude temp files
    ], { base: '.' })
        .pipe(phpToHtml())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            useShortDoctype: true
        }))
        .pipe(gulp.dest('out'))
}

// Copy component files (needed for PHP processing)
export function copyComponents() {
    return gulp.src(['components/**/*.php'], { base: '.' })
        .pipe(gulp.dest('.tmp'))
}

// Copy all images as-is (no processing)
export function copyImages() {
    return gulp.src([
        'assets/img/**/*'  // Copy all images including SVGs
    ], { 
        base: '.', 
        buffer: false,  // Don't load files into memory as text
        encoding: false // Preserve binary encoding
    })
        .pipe(gulp.dest('out'))
}

// Copy font files (binary handling)
export function copyFonts() {
    return gulp.src([
        'assets/fonts/**/*'
    ], { 
        base: '.', 
        buffer: false,  // Don't load files into memory as text
        encoding: false // Preserve binary encoding
    })
        .pipe(gulp.dest('out'))
}

// Copy other non-binary assets
export function copyAssets() {
    return gulp.src([
        'assets/css/vendor/**/*',
        'assets/svg/**/*',
        'assets/videos/**/*',
        'robots.txt',
        '.htaccess'
    ], { base: '.', allowEmpty: true })
        .pipe(gulp.dest('out'))
}

// Clean output directory
export function clean() {
    return deleteAsync(['out/**/*', '.tmp/**/*'])
}

// Clean temporary files
export function cleanTemp() {
    return deleteAsync(['.tmp/**/*'])
}

export function watchFiles() {
    gulp.watch('assets/scss/**/*.scss', compileSassTask)
    gulp.watch('assets/js/functions.js', compileJS)
}

export function serve() {
    bs.init({
        proxy: `localhost/clients/${projectFolderName}/`
    })
    gulp.watch('assets/scss/**/*.scss', compileSassTask)
    gulp.watch('assets/js/functions.js', compileJS)
    gulp.watch(['**/*.php', 'assets/js/*.js']).on('change', bs.reload)
}

export function servePHP() {
    bs.init({
        proxy: 'localhost:8000',
        port: 3002,
        open: true,
        notify: false
    })
    gulp.watch('assets/scss/**/*.scss', compileSassTask)
    gulp.watch('assets/js/functions.js', compileJS)
    gulp.watch(['**/*.php', 'assets/js/*.js']).on('change', bs.reload)
}

export const watch = gulp.parallel(
    watchFiles,
    serve
)

// Main build task
export const build = gulp.series(
    clean,
    copyComponents,  // Copy components first (needed for PHP processing)
    gulp.parallel(
        buildSass,
        buildJS,
        buildHTML,     // Process PHP to HTML
        copyImages,    // Copy all images as-is
        copyFonts,     // Copy font files with binary handling
        copyAssets     // Copy other assets (CSS, videos, etc.)
    ),
    cleanTemp      // Clean up temporary files
)