var gulp = require("gulp");

var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

var uglify = require("gulp-uglify");

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