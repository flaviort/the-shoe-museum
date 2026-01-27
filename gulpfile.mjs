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
import fs from 'fs'
import { fileURLToPath } from 'url'
import { deleteAsync } from 'del'
import through2 from 'through2'
import htmlmin from 'gulp-htmlmin'
// Image compression can be added here in the future

const compileSass = gulpSass(sass)
const bs = browserSync.create()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectFolderName = path.basename(__dirname)

function parsePhpValue(rawValue, vars) {
    const value = rawValue.trim().replace(/;$/, '')

    const isSingleQuoted = value.startsWith("'") && value.endsWith("'")
    const isDoubleQuoted = value.startsWith('"') && value.endsWith('"')

    if (isSingleQuoted || isDoubleQuoted) {
        return value.slice(1, -1)
    }

    if (value === 'true') {
        return true
    }

    if (value === 'false') {
        return false
    }

    if (/^\d+(\.\d+)?$/.test(value)) {
        return Number(value)
    }

    const concatMatch = value.match(/^\$([A-Za-z_]\w*)\s*\.\s*(['"])(.*?)\2$/)
    if (concatMatch) {
        const [, baseVar, , suffix] = concatMatch
        return String(vars[baseVar] ?? '') + suffix
    }

    return ''
}

function evalPhpExpression(expr, vars, projectRoot) {
    const cleaned = expr.trim().replace(/;$/, '')

    if (/^date\(\s*['"]Y['"]\s*\)$/.test(cleaned)) {
        return String(new Date().getFullYear())
    }

    const fileGetContentsMatch = cleaned.match(/^file_get_contents\(\s*['"]([^'"]+)['"]\s*\)$/)
    if (fileGetContentsMatch && projectRoot) {
        const absPath = path.resolve(projectRoot, fileGetContentsMatch[1])
        try {
            return fs.readFileSync(absPath, 'utf8')
        } catch {
            return ''
        }
    }

    const varMatch = cleaned.match(/^\$([A-Za-z_]\w*)$/)
    if (varMatch) {
        return String(vars[varMatch[1]] ?? '')
    }

    return ''
}

function runPhpBlock(code, vars, renderInclude) {
    let normalized = code.replace(/\r\n/g, '\n').trim()

    const emptyAssignMatch = normalized.match(
        /if\s*\(\s*empty\(\s*\$([A-Za-z_]\w*)\s*\)\s*\)\s*\{\s*\$([A-Za-z_]\w*)\s*=\s*(['"])(.*?)\3\s*;?\s*\}\s*else\s*\{\s*\$\2\s*=\s*\$\1\s*\.\s*(['"])(.*?)\5\s*;?\s*\}/s
    )

    if (emptyAssignMatch) {
        const [fullMatch, sourceVar, targetVar, , emptyValue, , suffix] = emptyAssignMatch
        const sourceValue = vars[sourceVar]
        vars[targetVar] = sourceValue ? String(sourceValue) + suffix : emptyValue

        // Remove this block so generic assignment parsing doesn't override it
        normalized = normalized.replace(fullMatch, '')
    }

    const titleMatch = normalized.includes('isset($post_title)') && normalized.includes('$site_title')
    if (titleMatch) {
        const pagePrefix = String(vars.post_title ?? vars.page ?? '').trim()
        const siteTitle = String(vars.site_title ?? '').trim()

        if (!pagePrefix) {
            return siteTitle
        }

        if (!siteTitle) {
            return pagePrefix
        }

        return `${pagePrefix} ${siteTitle}`
    }

    const conditionalIncludeMatch = normalized.match(
        /if\s*\(\s*!\s*\$([A-Za-z_]\w*)\s*\)\s*\{\s*include(?:_once)?\s*\(\s*['"]([^'"]+)['"]\s*\)\s*;?\s*\}\s*;?/s
    )

    if (conditionalIncludeMatch) {
        const [, flagVar, includePath] = conditionalIncludeMatch
        const flagValue = Boolean(vars[flagVar])

        if (!flagValue) {
            return renderInclude(includePath, vars)
        }

        return ''
    }

    const assignmentRegex = /\$([A-Za-z_]\w*)\s*=\s*([^;]+)\s*;?/g
    let assignmentMatch
    while ((assignmentMatch = assignmentRegex.exec(normalized)) !== null) {
        const [, name, rawValue] = assignmentMatch
        vars[name] = parsePhpValue(rawValue, vars)
    }

    let blockOutput = ''

    const includeRegex = /(?:include|require)(?:_once)?\s*\(\s*['"]([^'"]+)['"]\s*\)\s*;?/g
    let includeMatch
    while ((includeMatch = includeRegex.exec(normalized)) !== null) {
        const includePath = includeMatch[1]
        blockOutput += renderInclude(includePath, vars)
    }

    const echoVarRegex = /echo\s*\(?\s*\$([A-Za-z_]\w*)\s*\)?\s*;?/g
    let echoMatch
    while ((echoMatch = echoVarRegex.exec(normalized)) !== null) {
        const [, name] = echoMatch
        blockOutput += String(vars[name] ?? '')
    }

    return blockOutput
}

function renderPhpString(input, vars, renderInclude, projectRoot) {
    const tagRegex = /<\?(php|=)([\s\S]*?)\?>/g
    let output = ''
    let lastIndex = 0
    let match

    while ((match = tagRegex.exec(input)) !== null) {
        output += input.slice(lastIndex, match.index)

        const tagType = match[1]
        const code = match[2]

        if (tagType === '=') {
            output += evalPhpExpression(code, vars, projectRoot)
        } else {
            output += runPhpBlock(code, vars, renderInclude)
        }

        lastIndex = tagRegex.lastIndex
    }

    output += input.slice(lastIndex)
    return output
}

// PHP to HTML processor (Node-based, no php binary required)
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

        const projectRoot = process.cwd()
        const renderingStack = new Set()

        function renderFileByAbsolutePath(absPath, vars) {
            if (renderingStack.has(absPath)) {
                return ''
            }

            renderingStack.add(absPath)

            const fileContent = fs.readFileSync(absPath, 'utf8')
            const rendered = renderPhpString(fileContent, vars, renderIncludePath, projectRoot)

            renderingStack.delete(absPath)
            return rendered
        }

        function renderIncludePath(includePath, vars) {
            const absPath = path.resolve(projectRoot, includePath)
            return renderFileByAbsolutePath(absPath, vars)
        }

        const vars = {}
        const input = file.contents.toString('utf8')
        const renderedHtml = renderPhpString(input, vars, renderIncludePath, projectRoot)

        const newFile = file.clone()
        newFile.path = file.path.replace('.php', '.html')
        newFile.contents = Buffer.from(renderedHtml)

        callback(null, newFile)
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
        '!router.php',
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

// Copy video files (binary handling)
export function copyVideos() {
    return gulp.src([
        'assets/videos/**/*'
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
        copyVideos,    // Copy video files with binary handling
        copyAssets     // Copy other assets (CSS, videos, etc.)
    ),
    cleanTemp      // Clean up temporary files
)