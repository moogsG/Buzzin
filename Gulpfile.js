'use strict';

const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass');

//register nodemon task
gulp.task('nodemon', () => {
    nodemon({
            script: './bin/www',
            env: {
                'NODE_ENV': 'development'
            }
        })
        .on('restart', () => {
            console.log('restarted');
        });

});

//SASS
gulp.task('sass', () => {
    gulp.src('./public/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./public'));
});

gulp.task('sass.watch', () => {
    gulp.watch(['./public/**/*.scss'], ['sass']);
});

// Rerun the task when a file changes
gulp.task('watch', () => {

    let server = livereload();
    gulp.src(['*.js', 'routes/*.js', 'public/*.js'], {
            read: true
        })
        .pipe(watch({
            emit: 'all'
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

  gulp.watch(['*.js', 'routes/*.js', 'views/**/*.*', 'public/**/*.*']).on('change', (file) => {
    server.changed(file.path);

        let server = livereload();
        gulp.src(['*.js', 'routes/*.js', 'public/*.js'], {
                read: true
            })
            .pipe(watch({
                emit: 'all'
            }))
            .pipe(jshint())
            .pipe(jshint.reporter('default'));

    })
});
gulp.task('lint', () => {
    gulp.src(['*.js', 'routes/*.js', 'public/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    //lint js files
    gulp.task('lint', () => {
        gulp.src(['*.js', 'routes/*.js', 'public/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });
});
gulp.task('default', ['lint', 'nodemon', 'watch', 'sass.watch']);
