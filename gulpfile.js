let gulp = require('gulp');
let browserSync = require('browser-sync').create();
// let minifyCss = require('gulp-uglify');
// let minifyCss = require('gulp-minify-css');
// const del = require('del');
// const zip = require('gulp-zip');
// var gulpCopy = require('gulp-copy');



gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('styles/*.css', browserSync.reload);
  gulp.watch('js/*.js', browserSync.reload);
});

gulp.task('minify', () => {
  gulp.src('./styles/plain/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./styles/'));
});

// gulp.task('minifyCSS', () => {
//   gulp.watch('./styles/plain/*.css' , ['minify']);
// });

// gulp.task('build', () => {

//   del(['./build/**','!./node_modules'], {force:true});


//   gulp.src('./*.html')
//     .pipe(gulpCopy('./build'))

//   gulp.src('./images/**')
//     .pipe(gulpCopy('./build/'))
//     .pipe(gulp.dest('./inclov/'))

//   gulp.src('./**')
//     .pipe(gulp.dest('./build/'));

//   gulp.src('./build/**')
//     .pipe(zip('build.zip'));


//   gulp.src('./styles/*.css')
//     .pipe(gulp.dest('./build/styles/'));

//   gulp.src('./js/*')
//     .pipe((gulp.dest'./build/js/'));

//   gulp.src('./public/*')
//     .pipe((gulp.dest'./build/public/'));
// });




// gulp.task('css', function(){
//   gulp.watch('./styles/plain/*.css', function() {
//     gulp.src('./styles/*.css')
//       .pipe(minifyCss())
//       .pipe(gulp.dest('./styles/'));
//   });
// });




gulp.task('default', ['serve']);
