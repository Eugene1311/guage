var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('compress', function() {
  return gulp.src('js/guage.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/guage.min.js'));
});

gulp.task('default', ['browserSync'], function() {
  gulp.watch('./index.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});