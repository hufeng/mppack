import del from 'del';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import gless from 'gulp-less';
import rename from 'gulp-rename';
import ts from 'gulp-typescript';
import config from './config';

export const clean = () => {
  return del(config.output);
};

export const image = () =>
  gulp
    .src(config.image)
    .pipe(imagemin())
    .pipe(gulp.dest(config.output));

export const typescript = () => {
  const tsProject = ts.createProject('tsconfig.json');
  return gulp
    .src(config.typescript)
    .pipe(tsProject())
    .pipe(gulp.dest(config.output));
};

export const json = () => gulp.src(config.json).pipe(gulp.dest(config.output));

export const css = () => {
  let extname = 'wxss';
  switch (config.type) {
    //微信
    case 'wxapp':
      extname = '.wxss';
      break;
    //钉钉e应用
    case 'eapp':
      extname = '.acss';
      break;
  }
  return gulp
    .src(config.css)
    .pipe(rename({ extname }))
    .pipe(gulp.dest(config.output));
};

export const less = () => {
  let extname = 'wxss';
  switch (config.type) {
    //微信
    case 'wxapp':
      extname = '.wxss';
      break;
    //钉钉e应用
    case 'eapp':
      extname = '.acss';
      break;
  }
  return gulp
    .src(config.less)
    .pipe(gless())
    .pipe(rename({ extname }))
    .pipe(gulp.dest(config.output));
};

export const watch = () => {
  gulp.watch(config.typescript, typescript);
  gulp.watch(config.image, image);
  gulp.watch(config.json, json);
  gulp.watch(config.css, css);
  gulp.watch(config.less, less);
};

export const build = gulp.series(
  clean,
  gulp.parallel(typescript, image, json, css, less)
);
