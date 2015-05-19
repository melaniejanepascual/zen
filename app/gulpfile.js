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

gulp.task('copyjs', function() {
    gulp.src('js/*.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copyimages', function() {
    gulp.src('images/*.{gif,jpg,jpeg,png,webp}')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {
  gulp.watch('css/*.scss', ['sass']);
  gulp.watch('js/*.js', ['copyjs']);
  gulp.watch('images/*', ['copyimages']);
});

gulp.task('default', ['start', 'watch'], function() {

});