'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'del']
});

gulp.task('clean', function (done) {
  $.del('dist/', done);
});

gulp.task('scripts', function () {
  return gulp.src('src/angular-ajax-indicator.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('default', ['clean', 'scripts'], function () {
  return gulp.src('src/angular-ajax-indicator.js')
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', function(title) {
      return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
      };
    })
    .pipe($.rename('angular-ajax-indicator.min.js'))
    .pipe(gulp.dest('dist/'))
    .pipe($.size({ title: 'dist/', showFiles: true }));
});
