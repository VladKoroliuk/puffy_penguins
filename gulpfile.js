const gulp = require("gulp");
const include = require("gulp-file-include");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const sync = require("browser-sync").create();
function html() {
  return gulp
    .src("src/html/**.html")
    .pipe(
      include({
        prefix: "@@",
      })
    )
    .pipe(gulp.dest("dist"));
}

function clear() {
  return del("dist");
}

function scss() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest("./dist/css"));
}
function assets() {
  return gulp.src("./src/assets/**").pipe(gulp.dest("./dist/assets"));
}

function scripts() {
  return gulp.src("./src/js/*.js").pipe(gulp.dest("./dist/js"));
}

function serve() {
  sync.init({
    server: "./dist",
  });

  gulp.watch("src/html/**.html", gulp.series(html)).on("change", sync.reload);
  gulp.watch("src/js/**.js", gulp.series(scripts)).on("change", sync.reload);
  gulp.watch("./src/scss/*.scss", gulp.series(scss)).on("change", sync.reload);
  gulp.watch("./src/assets/*", gulp.series(assets)).on("change", sync.reload);
}

exports.serve = gulp.series(clear, scss, assets, scripts, html, serve);
exports.build = gulp.series(clear, scss, assets, scripts, html);
