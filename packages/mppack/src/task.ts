import del from 'del';
import gulp from 'gulp';
import ts from 'gulp-typescript';
import config from './config';

export const clean = () => {
  return del(config.dest);
};

export const typescript = () => {
  const tsProject = ts.createProject('tsconfig.json');
  return gulp
    .src(config.typescript)
    .pipe(tsProject())
    .pipe(gulp.dest(config.dest));
};

export const build = gulp.series(clean, gulp.parallel(typescript));
