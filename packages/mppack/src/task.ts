import del from 'del';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import ts from 'gulp-typescript';
import config from './config';

export const clean = () => {
  return del(config.output);
};

export const image = () => {
  return gulp
    .src(config.image)
    .pipe(imagemin())
    .pipe(gulp.dest(config.output));
};

export const typescript = () => {
  const tsProject = ts.createProject('tsconfig.json');
  return gulp
    .src(config.typescript)
    .pipe(tsProject())
    .pipe(gulp.dest(config.output));
};

export const json = () => {
  return gulp.src(config.json).pipe(gulp.dest(config.output));
};

export const watch = () => {
  gulp.watch(config.typescript, typescript);
  gulp.watch(config.image, image);
};

export const build = gulp.series(clean, gulp.parallel(typescript, image, json));
