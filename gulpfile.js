const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const browsersync = require("browser-sync");

// Sass Task
const scssTask = () => {
    return src("./scss/style.scss", { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano]))
        .pipe(dest("css", { sourcemaps: "." }));
};

// Browsersync Tasks
const browsersyncServe = (cb) => {
    browsersync.init({
        server: {
            baseDir: ".",
        },
    });
    cb();
};

const browsersyncReload = (cb) => {
    browsersync.reload();
    cb();
};

// Watch Task
const watchTask = () => {
    watch("*.html", browsersyncReload);
    watch("./scss/**/*.scss", series(scssTask, browsersyncReload));
};

// Default Gulp Task
exports.default = series(scssTask, browsersyncServe, watchTask);
