import debug from 'debug';
import gulp from 'gulp';
import gless from 'gulp-less';
import rename from 'gulp-rename';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';

const debugLog = debug('mppack:task:less');

export const less = () => {
  const { output, less, target } = config;
  let extname = 'wxss';
  switch (target) {
    //微信
    case 'wxapp':
      extname = '.wxss';
      break;
    //钉钉e应用
    case 'eapp':
      extname = '.acss';
      break;
  }
  debugLog(
    'output: %s, target: %s, extname: %s, css: %j',
    output,
    target,
    extname,
    less
  );
  return gulp
    .src(less)
    .pipe(changed())
    .pipe(log({ prefix: 'less', extName: extname }))
    .pipe(gless())
    .pipe(rename({ extname }))
    .pipe(gulp.dest(output));
};
