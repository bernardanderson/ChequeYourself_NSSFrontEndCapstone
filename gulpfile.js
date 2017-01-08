var gulp = require('gulp');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');

gulp.task('default', ['watch', 'lint']);

gulp.task('watch', function() {
  gulp.watch('./app/**/*.js', ['lint']);
});

gulp.task('lint', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
