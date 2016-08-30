var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var pug          = require('pug');
var gulpPug      = require('gulp-pug');
// var prettify     = require('gulp-js-prettify');
var sass         = require('gulp-sass');
var babel        = require('gulp-babel');
var print        = require('gulp-print');


gulp.task('sass', function () {
    return gulp.src('assets/css/main.scss')
        .pipe(print())
        .pipe(sass({
            includePaths: ['css']
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true }))
        .pipe(gulp.dest('build'))
        // .pipe(gulp.dest('sass'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    });
});

gulp.task('pug', function(){
  return gulp.src('views/*.pug')
    .pipe(print())
    .pipe(gulpPug({
      pug: pug,
      pretty: true
    }))
    .pipe(gulp.dest('build'))
});

gulp.task('js', function(){
  return gulp.src('assets/es6/*.js')
        .pipe(print())
        .pipe(babel({presets:['es2015']}))
        .pipe(gulp.dest('build/js'))
});
/*
gulp.task('prettify', function(){
  gulp.src('js/*.js')
    .pipe(prettify({collapseWhitespace: true}))
    .pipe(gulp.dest('production/js'))
 });*/

gulp.task('watch', ['browserSync'], function(){
  // gulp.watch('assets/css/*.scss', ['saas']);
  gulp.watch('views/*.pug', ['pug']);
  gulp.watch('es6/*.js', ['js']);
  gulp.watch('assets/css/**', ['sass']);
  gulp.watch('production/**', browserSync.reload);
});

gulp.task('default', ['watch']);
