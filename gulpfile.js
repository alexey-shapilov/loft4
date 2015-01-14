var
    $ = require('gulp-load-plugins')({
        pattern: '*',
        lazy: false
    }),
    productionPath = './app/';

$.gulp.task('build', function () {
    var assets = $.useref.assets();
    $.rimraf.sync(productionPath, function (er) {
        console.log('myErr');
        if (er) throw er
    });
    $.gulp.src(['./_dev/.htaccess'])
        .pipe($.wiredep.stream({
            directory: '_dev/_bower'
        })).on('error', log)
        .pipe(assets).on('error', log)
        .pipe($.if('**/bower.js', $.uglify())).on('error', log)
        .pipe($.if('*.css', $.minifyCss())).on('error', log)
        .pipe(assets.restore()).on('error', log)
        .pipe($.useref()).on('error', log)
        .pipe($.gulp.dest(function (file) {
            return file.base.substr((file.cwd + '/_dev').length + 1);
        }, {cwd: productionPath})).on('error', log);
});

$.gulp.task('css_img', function () {
    $.gulp.src(['./_dev/_sass/img/*'])
        .pipe($.gulp.dest(function (file) {
            return file.base.substr((file.cwd + '/_dev').length + 1);
        }, {cwd: productionPath})).on('error', log);
});

$.gulp.task('sass', function () {
    $.gulp.src(['./_dev/_sass/*.scss'])
        .pipe($.compass({
            css: './_dev/_sass',
            sass: './_dev/_sass'
        })).on('error', log)
        .pipe($.minifyCss()).on('error', log)
        .pipe($.rename('style.min.css')).on('error', log)
        .pipe($.gulp.dest('./app/css')).on('error', log);
});


$.gulp.task('watch', function () {
    $.gulp.watch('./_dev/**/*', ['build','css_img','sass']);
});

function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}