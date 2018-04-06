var browserify = require("browserify"),
    gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css"),
    concat = require("gulp-concat"),
    ggf = require("gulp-google-fonts"),
    imageResize = require("gulp-image-resize"),
    livereload = require("gulp-livereload"),
    modifyFile = require("gulp-modify-file"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    serve = require("gulp-serve"),
    svgmin = require("gulp-svgmin"),
    uglify = require("gulp-uglify"),
    source = require('vinyl-source-stream');

const WWW = 'public';
const JS_src = './src/js/main.js';
const SCSS_src = './src/scss/*.scss';
const LIBS = [];
gulp.task('serve', serve({
    root: [WWW],
    port: 3000
}));

gulp.task('minjs', ['js'], function() {
    gulp.src('./' + WWW + '/js/*')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./' + WWW + '/js'));
});

gulp.task('js', function() {
    var bfy = browserify(JS_src)
        //.transform(vueify)
        .bundle();

    return bfy
        .pipe(source('main.js'))
        .pipe(gulp.dest('./' + WWW + '/js'))
        .pipe(livereload());
});

gulp.task('js:watch', ['js'], function() {
    livereload.listen();
    gulp.watch([JS_src], ['js']);
});

gulp.task('lib', function() {
    gulp.src(LIBS)
        .pipe(concat('lib.min.css'))
        .pipe(gulp.dest('./' + WWW + '/css'))

});

gulp.task('sass', function() {
    gulp.src(SCSS_src)
        .pipe(sass())
        .pipe(gulp.dest('./' + WWW + '/css'))
        .pipe(rename('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./' + WWW + '/css'))
        .pipe(livereload());
});

gulp.task('sass:watch', function() {
    livereload.listen();
    gulp.watch(SCSS_src, ['sass']);
});

gulp.task('font', function() {
    return gulp.src('config.neon')
        .pipe(ggf())
        .pipe(gulp.dest('./' + WWW + '/fonts'));
});
