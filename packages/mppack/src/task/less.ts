import debug from 'debug';
import gulp from 'gulp';
import gless from 'gulp-less';
import rename from 'gulp-rename';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
import { getMpCssExtname } from '../util.';

const debugLog = debug('mppack:task:less');

export const less = () => {
  const { output, less, target } = config;
  let extname = getMpCssExtname(target);
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
