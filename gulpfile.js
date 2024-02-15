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

gulp.task('font-preparing', gulp.series(
  () => gulp
    .src('./src/fonts/*')
    .pipe(clean()),
  () => gulp
    .src('./fonts.list')
    .pipe(googleWebFonts({
      fontDisplayType: 'swap'
    }))
    .pipe(gulp.dest('./src/fonts')),
));

gulp.task('fonts', () => {
  return gulp
    .src('./src/fonts/*.woff')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('html', () => {
  return gulp
    .src('./src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('style', () => {
	return gulp
    .src('./src/style/main.scss')
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(cleancss({ level: 2 }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
	return gulp
    .src('./src/images/*')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src('./src/js/*')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

const build = gulp.series(
  () => gulp.src('./dist/*').pipe(clean()),
  gulp.parallel(
    gulp.task('fonts'),
    gulp.task('html'),
    gulp.task('style'),
    gulp.task('images'),
    gulp.task('js'),
  ),
);

const dev = gulp.task('dev', () => {
  browserSync({
    server: {
      baseDir: './dist'
    },
    open: true,
    notify: false,
  });
  gulp.watch('./src/**/*.scss', gulp.task('style'));
  gulp.watch('./src/**/*.pug', gulp.task('html'));
  gulp.watch('./src/images/*', gulp.task('images'));
  gulp.watch('./src/js/*', gulp.task('js'));
  gulp.watch('./src').on('change', browserSync.reload);
});

module.exports = {
  build,
  dev,
};
