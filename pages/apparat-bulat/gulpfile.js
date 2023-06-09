const gulp = require("gulp");
const { src, series, parallel, dest } = require("gulp");
const concat = require("gulp-concat"); // конкатенирует файлы в один
const gcmq = require("gulp-group-css-media-queries"); // сливает однинаковые media
const autoprefixer = require("gulp-autoprefixer"); // расставляет префиксы
const cleancss = require("gulp-clean-css"); // минифицирует css
const babel = require("gulp-babel"); // компиляция скрипты в es5
const terser = require("gulp-terser"); // минифицирует js
const sass = require("gulp-sass")(require("sass")); // работа с scss

// пути к файлам
const paths = {
  styles: {
    src: "web/styles/main-style.css",
    dest: "web/styles/",
  },

  scripts: {
    src: "web/scripts/custom.js",
    dest: "web/scripts/",
  },
};

function cssTask() {
  return src(paths.styles.src)
    .pipe(concat("main-style.min.css"))
    .pipe(gcmq())
    .pipe(autoprefixer())
    .pipe(
      cleancss({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(dest(paths.styles.dest));
}

// отслеживание sass
function sassTask() {
  return gulp
    .src("web/styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("web/styles"));
}

function watchSass() {
  return gulp.watch("web/styles/style.scss", gulp.series(sassTask));
}

// сборка скриптов
function jsTask() {
  return src(paths.scripts.src)
    .pipe(concat("custom.min.js"))
    .pipe(terser())
    .pipe(dest(paths.scripts.dest));
}

exports.css = cssTask;
exports.js = jsTask;

exports.build = series(parallel(cssTask, jsTask));
exports.watch = watchSass;
