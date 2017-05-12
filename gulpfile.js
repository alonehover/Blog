const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-minify-css');

gulp.task('less', function() {
    gulp.src("resource/less/style.less")
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest("public/styles"));
});

gulp.task('default', function() {
    gulp.watch('resource/less/*.less', ['less']);
});
