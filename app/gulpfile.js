var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon'),
    sass    = require('gulp-ruby-sass');

gulp.task('start', function() {
  nodemon({ script: 'server.js' });
});

gulp.task('sass', function () {
    return sass('css/main.scss')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('css/*.scss', ['sass']);
});

gulp.task('default', ['start', 'watch'], function() {

});