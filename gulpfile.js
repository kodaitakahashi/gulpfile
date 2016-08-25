var gulp = require("gulp");

var slim = require("gulp-slim");

var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

var uglify = require("gulp-uglify");
var react = require("gulp-react");

var using = require("gulp-using");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");


gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("watch", ['server'], function() {
    gulp.watch(["js/**/*.js", "!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss", ["sass"]);
    gulp.watch("slim/**/*.slim", ["slim"]);
    gulp.watch("react/**/*.jsx", ["react"]);
});

gulp.task("slim", function() {
    gulp.src("slim/**/*.slim")
    .pipe(plumber())
    .pipe(slim())
    .pipe(gulp.dest("./public/html"))
    .pipe(browser.reload({stream:true}));
});

gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}));
});

gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./js/min"))
        .pipe(browser.reload({stream:true}));
});

gulp.task("react", function(){
    gulp.src("./react/**/*.jsx")
    .pipe(plumber())
    .pipe(using())
    .pipe(react())
    .pipe(gulp.dest('js/'));
    .pipe(browser.reload({stream:true}));
});

