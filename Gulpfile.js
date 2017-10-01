'use strict';

const gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  watch = require('gulp-watch'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  browserify = require('gulp-browserify');
//register nodemon task
gulp.task('nodemon', () => {
  nodemon({ script: './bin/www', env: { 'NODE_ENV': 'development' }})
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
    gulp.src(['*.js','routes/*.js', 'public/*.js'], { read: true })
        .pipe(watch({ emit: 'all' }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    gulp.watch(['*.js','routes/*.js', 'views/**/*.*', 'public/**/*.*']).on('change', (file) => {
      server.changed(file.path);

  });

});

gulp.task('scripts', () => {
    // Single entry point to browserify
    gulp.src('scripts/*.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('public/scripts/'));

});

//lint js files
gulp.task('lint', () => {
    gulp.src(['*.js','routes/*.js', 'public/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'lint','nodemon', 'watch', 'sass.watch']);
