const { watch, src, dest, parallel } = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const minifycss = require('gulp-minify-css')
const browserSync = require('browser-sync').create()

const paths = {
  pages: {
    src: 'src/pug/*.pug',
    watch: 'src/pug/**/*.pug',
    dest: 'public'
  },
  styles: {
    src: 'src/scss/*.scss',
    watch: 'src/scss/**/*.scss',
    dest: 'public/css'
  },
  scripts: {
    src: 'src/js/*.js',
    watch: 'src/js/**/*.js',
    dest: 'public/js'
  },
}

function devPug() {
  return src(paths.pages.src)
    .pipe(pug({
      pretty: true
    }))
    .pipe(pug())
    .pipe(dest(paths.pages.dest))
}

function devSass() {
  return src(paths.styles.src)
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer())
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function devJs() {
  return src(paths.scripts.src)
    .pipe(concat('script.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(dest(paths.scripts.dest))
}

function buildPug() {
  return src(paths.pages.src)
    .pipe(pug())
    .pipe(dest(paths.pages.dest))
}

function buildSass() {
  return src(paths.styles.src)
    .pipe(sass())
    .pipe(minifycss())
    .pipe(dest(paths.styles.dest))
}

function buildJs() {
  return src(paths.scripts.src)
    .pipe(concat('script.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  })
}

function watchPug() {
  watch(paths.pages.watch, devPug)
    .on('change', browserSync.reload)
}
function watchSass() {
  watch(paths.styles.watch, devSass)
}
function watchJs() {
  watch(paths.scripts.watch, devJs)
    .on('change', browserSync.reload)
}

function copy() {
  return src('src/assets/**')
    .pipe(dest('public/assets/'))
}

exports.devPug          = devPug
exports.devSass         = devSass
exports.devJs           = devJs
exports.serve           = serve
exports.copy            = copy
exports.watchPug        = watchPug
exports.watchSass       = watchSass
exports.watchJs         = watchJs
exports.watchAll        = parallel(watchPug, watchSass, watchJs)
exports.dev             = parallel(devPug, devSass, devJs)
exports.build           = parallel(buildPug, buildSass, buildJs, copy)
exports.default         = parallel(serve, this.dev, this.watchAll, copy)
