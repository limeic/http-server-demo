import gulp from 'gulp';
import watch from 'gulp-watch';
import babel from 'gulp-babel';

// transform
gulp.task('transform', () => {
  return gulp.src('source/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

// watch transform
gulp.task('watch-transform', () => {
  return gulp.src('source/**/*.js')
    .pipe(watch('source/**/*.js', {
      verbose: true
    }))
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['watch-transform']);
