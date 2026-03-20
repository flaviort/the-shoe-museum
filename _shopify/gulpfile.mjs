import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as sass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'

const compileSass = gulpSass(sass)

// ─── SCSS ────────────────────────────────────────────────────────────────────

const sassOptions = {
    outputStyle: 'compressed',
    silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions']
}

// Dev: compile with sourcemaps → assets/main.min.css
export function compileSassTask() {
    return gulp.src('scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(compileSass(sassOptions).on('error', compileSass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ basename: 'main', suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets'))
}

// Prod: no sourcemaps, maximum minification
export function buildSass() {
    return gulp.src('scss/main.scss')
        .pipe(compileSass({ ...sassOptions, silenceDeprecations: [...sassOptions.silenceDeprecations] }).on('error', compileSass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8',
            level: 2,
            inline: ['local'],
            rebase: false
        }))
        .pipe(rename({ basename: 'main', suffix: '.min' }))
        .pipe(gulp.dest('assets'))
}

// ─── JS ──────────────────────────────────────────────────────────────────────

// Dev: compile with sourcemaps → assets/main.js
export function compileJS() {
    return gulp.src('js/functions.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ basename: 'main' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets'))
}

// Prod: no sourcemaps, maximum minification
export function buildJS() {
    return gulp.src('js/functions.js')
        .pipe(uglify({
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.warn'],
                passes: 2
            },
            mangle: {
                toplevel: false,
                reserved: ['$', 'jQuery', 'lenis', 'gsap', 'ScrollTrigger', 'SplitText', 'Swiper', 'Fancybox']
            },
            output: {
                comments: false
            }
        }))
        .pipe(rename({ basename: 'main' }))
        .pipe(gulp.dest('assets'))
}

// ─── WATCH & BUILD ───────────────────────────────────────────────────────────

export function watchFiles() {
    gulp.watch('scss/**/*.scss', compileSassTask)
    gulp.watch('js/functions.js', compileJS)
}

// Run initial compile then start watchers
export const watch = gulp.series(
    gulp.parallel(compileSassTask, compileJS),
    watchFiles
)

export const build = gulp.parallel(buildSass, buildJS)
