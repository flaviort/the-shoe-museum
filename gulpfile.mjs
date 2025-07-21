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

const compileSass = gulpSass(sass)
const bs = browserSync.create()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectFolderName = path.basename(__dirname)

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