var
    $ = require('gulp-load-plugins')({
        pattern: '*',
        lazy: false
    });
productionPath = './app/';

// При использвоании плагина gulp-load-plugins записи:
//
// $.gulp.task аналогичена:
//      var gulp = require('gulp');
//      gulp.task
//
// $.uglify() аналогична:
//      var uglify = require('gulp-uglify');
//      uglify();


//
// Задача собирает проект с php
//
$.gulp.task('build-with-php', function () {
    var assets = $.useref.assets();
    $.rimraf.sync(productionPath, function (er) {
        console.log('myErr');
        if (er) throw er;
    });
    return $.gulp.src('./_dev/_server/**/*.php')
        .pipe($.wiredep.stream({
            directory: '_dev/_bower',
            fileTypes: {
                php: {
                    block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                    detect: {
                        js: /<script.*src=['"]([^'"]+)/gi,
                        css: /<link.*href=['"]([^'"]+)/gi
                    },
                    replace: {
                        js: '<script src="{{filePath}}"></script>',
                        css: '<link rel="stylesheet" href="{{filePath}}" />'
                    }
                }
            }
        })).on('error', log)
        .pipe(assets).on('error', log)
        .pipe($.if('*.js', $.uglify())).on('error', log)
        //.pipe($.if('*.css', $.minifyCss())).on('error', log)
        //.pipe($.if('*.css', $.rename(function (path) {
        //    path.basename += ".min";
        //})))
        .pipe(assets.restore()).on('error', log)
        .pipe($.useref()).on('error', log)
        .pipe($.gulp.dest(function (file) {
            return file.base.substr((file.cwd + '/_dev/_server').length + 1);
        }, {cwd: productionPath})).on('error', log);
});

//
// Собираем sass -> css
//
$.gulp.task('sass', function () {
    return $.gulp.src(['./_dev/_sass/style.scss'])
        // вызов плагина gulp-compass
        .pipe($.compass({
            css: './_dev/_sass',
            sass: './_dev/_sass'
        })).on('error', log)
        .pipe($.gulp.dest('./_dev/_sass')).on('error', log);
});

// Задачи необходимы если хотим собрать проект без php ====================================

//
// Собираем jade
//
$.gulp.task('jade', function () {
    return $.gulp.src('./_dev/_jade/_pages/*.jade')
        // вызов плагина gulp-jade
        .pipe($.jade({
            pretty: true
        })).on('error', log)
        .pipe($.gulp.dest('./_dev/_jade/_pages'));
});

$.gulp.task('jade-views', function () {
    return $.gulp.src('./_dev/_jade/_views/*.jade')
        // вызов плагина gulp-jade
        .pipe($.jade({
            pretty: true
        })).on('error', log)
        .pipe($.gulp.dest('./_dev/_jade/_views'));
});

$.gulp.task('jade-dTpl', function () {
    return $.gulp.src('./_dev/_jade/_dTemplates/*.jade')
        // вызов плагина gulp-jade
        .pipe($.jade({
            pretty: true
        })).on('error', log)
        .pipe($.gulp.dest('./_dev/_jade/_dTemplates'));
});

$.gulp.task('css-minify', function () {
    return $.gulp.src('./app/css/**/*.css')
        // вызов плагина gulp-jade
        .pipe($.minifyCss()).on('error', log)
        .pipe($.gulp.dest('./app/css'));
});


//
// Собираем проект без PHP
//
$.gulp.task('build-without-php', ['jade', 'jade-views', 'jade-dTpl', 'sass'], function () {
    var assets = $.useref.assets(); //Функция плагина gulp-useref

    // Плагин rimraf удаляет каталог в переменной productionPath
    $.rimraf.sync(productionPath, function (er) {
        if (er) throw er;
    });
    $.gulp.src(['./_dev/_jade/_pages/*.html'])
        // Плагин wiredep обрабатывает зависимости bower
        .pipe($.wiredep.stream({
            directory: './_dev/_bower'
        }))
        .pipe(assets).on('error', log) // находит блоки build в html и выделяет из них необходимые ресурсы
        //.pipe($.if('*.js', $.uglify())).on('error', log)
        //.pipe($.if('*.css', $.minifyCss({cache:false})))  // Минификация Css не работает в таком контексте, не справляется с путями к css

        // Следующие две строчки были в примере плагина gulp-useref, пока не разбирался зачем они
        .pipe(assets.restore()).on('error', log)
        .pipe($.useref()).on('error', log)
        .pipe($.gulp.dest(productionPath)).on('error', log);
});

//
//====================================
//

$.gulp.task('views', function () {
    return $.gulp.src('./_dev/_jade/_views/*.html')
        .pipe($.gulp.dest('./app/views/'));
});

$.gulp.task('d-templates', function () {
    return $.gulp.src('./_dev/_jade/_dTemplates/*.html')
        .pipe($.gulp.dest('./app/dTemplates/'));
});

// шрифты
$.gulp.task('fonts', function () {
    return $.gulp.src('./_dev/_sass/fonts/*')
        .pipe($.gulp.dest('./app/css/fonts/'));
});
// изображения для стилей
$.gulp.task('css-img', function () {
    return $.gulp.src('./_dev/_sass/img/*')
        .pipe($.gulp.dest('./app/css/img/'));
});

$.gulp.task('ico', function () {
    return $.gulp.src('./_dev/*.ico')
        .pipe($.gulp.dest('./app'));
});

$.gulp.task('uploads', function () {
    return $.gulp.src('./_dev/_server/uploads')
        .pipe($.gulp.dest('./app/'));
});

$.gulp.task('htaccess', function () {
    return $.gulp.src(['./_dev/_server/.htaccess', './_dev/*.ico'])
        .pipe($.gulp.dest('./app'));
});

$.gulp.task('build-with-php_css-minify', function (callback) {
    $.runSequence(['jade-views', 'jade-dTpl', 'sass'], 'build-with-php', ['views', 'd-templates', 'fonts', 'css-img', 'ico', 'uploads', 'htaccess'], 'css-minify', callback)
});


$.gulp.task('watch-without-php', ['build-without-php'], function () {
    $.gulp.watch(['./_dev/_jade/**/*.jade', './_dev/_js/**/*.js', './_dev/_sass/**/*.scss', './_dev/_sass/fonts/*'], ['build-without-php']);
});

$.gulp.task('watch-with-php', ['build-with-php_css-minify'], function () {
    $.gulp.watch(['./_dev/_jade/_dTemplates/*.jade', './_dev/_jade/_views/*.jade', './_dev/_js/**/*.js', './_dev/_server/**/*.php', './_dev/_sass/**/*.scss', './_dev/_sass/fonts/*'], ['build-with-php_css-minify']);
});

$.gulp.task('default', ['watch-with-php']);

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

