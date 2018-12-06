import debug from 'debug';
import gulp from 'gulp';
import rename from 'gulp-rename';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:css');

export const css = () => {
  const { output, target, css } = config;
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
    css
  );

  return gulp
    .src(css)
    .pipe(changed())
    .pipe(log({ prefix: 'css', extName: extname }))
    .pipe(rename({ extname }))
    .pipe(gulp.dest(output));
};
