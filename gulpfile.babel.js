'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import watchify from 'watchify';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';

browserSync.create();

const browsersyncOptions = {
    server: {
        baseDir: `build`
    },
    "startPath": "index.html",
    "proxy": true,
    "port": 3000,
    "xip": false,
    "notify": true,
    "minify": true,
};

const watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: [`src/js/main.js`],
    cache: {},
    packageCache: {}
}));

function bundle() {
    return watchedBrowserify
        // .transform('babelify', { presets: ["es2015"] })
        .transform('babelify', { presets: ["es2015-ie"] })
        .bundle()
        .on('error', error => {
            console.log(error);
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(`build/assets/js/libs/`));
}

gulp.task('js', bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);

gulp.task('html', () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest(`build/`))
});

gulp.task('default', ['html', 'js'], () => {
    browserSync.init(browsersyncOptions);
    gulp.watch(`src/js/main.js`, ['js']);
    gulp.watch(`src/*.html`, ['html']);
 
    gulp.watch([
        `build/assets/js/bundle.js`,
        `build/*.html`
    ]).on('change', browserSync.reload);
});
