const gulp = require('gulp')
const { src, series, parallel, dest } = require('gulp')
const concat = require('gulp-concat')  // конкатенирует файлы в один
const gcmq = require('gulp-group-css-media-queries')  // сливает однинаковые media
const autoprefixer = require('gulp-autoprefixer')  // расставляет префиксы
const cleancss = require('gulp-clean-css')  // минифицирует css
const modifyCssUrls = require('gulp-modify-css-urls')  // меняет пути изображений в css
const babel = require('gulp-babel')  // компиляция скрипты в es5
const terser = require('gulp-terser')  // минифицирует js
const imagemin = require('gulp-imagemin')  // оптимизирует изображения
const pngquant = require('imagemin-pngquant')  // качественно сжимает png
const webp = require('gulp-webp')  // конвертирует изображения в webp
const sass = require('gulp-sass')(require('sass'))  // работа с scss


// пути к файлам
const paths = {
    styles: {
        src: 'web/styles/style.css',
        dest: 'web/styles/'
    },
    scripts: {
        src1: 'web/scripts/custom.js',
        src2: 'web/scripts/reactive.js',
        dest: 'web/scripts/'
    },
    img: {
        src: 'web/images/src/*',
        dest: 'web/images/'
    }
}


// сборка стилей
function cssTask() {
    return src(paths.styles.src)
        .pipe(concat('style.min.css'))
        .pipe(modifyCssUrls({
            modify: function (url, filePath) {
                return url.replace('../images/src', '../images');
            }
        }))
        .pipe(gcmq())
        .pipe(autoprefixer())
        .pipe(cleancss({ 
            level: { 
                1: { 
                    specialComments: 0 
                } 
            }
        }))
        .pipe(dest(paths.styles.dest))
}


// отслеживание sass
function sassTask() {
    return gulp.src('web/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('web/styles'))
}

function watchSass() {
    return gulp.watch('web/styles/_header-new.scss', gulp.series(sassTask))
}


// сборка скриптов
function jsTask() {
    return src(paths.scripts.src1)
        .pipe(concat('custom.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(dest(paths.scripts.dest))
}

// минификация скрипта react
function jsxTask() {
    return src(paths.scripts.src2)
        .pipe(concat('reactive.min.js'))
        //.pipe(babel({
            //plugins: ['transform-react-jsx']
        //}))
        .pipe(terser())
        .pipe(dest(paths.scripts.dest))
}


// оптимизация изображений
function imgTask() {
    return src(paths.img.src)
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 80, progressive: true}),
            pngquant({quality: [0.8, 0.8]})
          ]))
        .pipe(gulp.dest(paths.img.dest))
}

function webpTask() {
    return src(paths.img.src)
    .pipe(webp())
    .pipe(gulp.dest(paths.img.dest))
}


exports.css = series(
    parallel(cssTask)
)
exports.js = series(
    parallel(jsTask)
)
exports.jsx = series(
    parallel(jsxTask)
)
exports.build = series(
    parallel(cssTask, jsTask, imgTask, webpTask)
)
exports.img = series(
    parallel(imgTask, webpTask)
)
exports.watch = watchSass