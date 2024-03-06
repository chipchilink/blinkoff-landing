const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const cleancss = require('gulp-clean-css');
const googleWebFonts = require('gulp-google-webfonts');
const clean = require('gulp-clean');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync');

const paths = {
  root: {
    input: './src',
    output: './dist',
  },
  view: {
    input: './src/index.pug',
    output: './dist/',
  },
  fonts: {
    config: './fonts.list',
    input: './src/fonts',
    output: './dist/',
  },
  style: {
    input: './src/style/main.scss',
    output: './dist/',
  },
  images: {
    input: './src/images/*',
    output: './dist/',
  },
  js: {
    input: './src/js/*',
    output: './dist/',
  },
};

const cleanFonts = () =>
  gulp
    .src(paths.fonts.input, { allowEmpty: true })
    .pipe(clean());

const generate1 = () =>
  gulp
    .src(paths.fonts.config)
    .pipe(googleWebFonts({
      fontDisplayType: 'swap'
    }))
    .pipe(gulp.dest(paths.fonts.input));

const extractFontCSS = () =>
  gulp
    .src(paths.fonts.input + '/fonts.css')
    .pipe(gulp.dest('./src/style'));

const fontPreparing = gulp.series(
  cleanFonts,
  generate1,
  extractFontCSS,
);

const fonts = () =>
  gulp
    .src(paths.fonts.input + '/*.woff')
    .pipe(gulp.dest(paths.fonts.output));

const view = () =>
  gulp
    .src(paths.view.input)
    .pipe(pug())
    .pipe(gulp.dest(paths.view.output))
    .pipe(browserSync.stream());

const style = () =>
	gulp
    .src(paths.style.input)
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(cleancss({ level: 2 }))
    .pipe(gulp.dest(paths.style.output))
    .pipe(browserSync.stream());

const images = () =>
	gulp
    .src(paths.images.input)
    .pipe(gulp.dest(paths.images.output))
    .pipe(browserSync.stream());

const js = (mode) => () =>
  gulp.src(paths.js.input)
    .pipe(webpackStream(webpackConfig(mode)), webpack)
    .pipe(gulp.dest(paths.js.output))
    .pipe(browserSync.stream());

const init = () =>
  gulp
    .src(['./'], { allowEmpty: true })
    .pipe(gulp.dest(paths.root.output));

const cleany = () =>
  gulp
    .src(paths.root.output)
    .pipe(clean());

const create = (p) => gulp.series(
  fontPreparing,
  init,
  cleany,
  gulp.parallel(
    fonts,
    view,
    style,
    images,
    js(p.mode),
  ),
);

const server = (done) => {
  browserSync({
    server: {
      baseDir: paths.root.output,
    },
    open: true,
    notify: false,
  });
  done();
};

const watcher = (done) => {
  gulp.watch('./src/**/*.scss', style);
  gulp.watch('./src/**/*.pug', view);
  gulp.watch(paths.images.input, images);
  gulp.watch(paths.js.input, js('development'));
  gulp.watch(paths.root.input).on('change', browserSync.reload);
  done();
};

const dev = gulp.series(
  create({ mode: 'development' }),
  server,
  watcher,
);

const build = create({ mode: 'production' });

module.exports = {
  build,
  dev,
};
