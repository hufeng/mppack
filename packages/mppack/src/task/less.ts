import debug from 'debug';
import flog from 'fancy-log';
import gulp from 'gulp';
import gless from 'gulp-less';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
import { getMpCssExtname } from '../util';

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
    .pipe(plumber())
    .pipe(changed())
    .pipe(log({ prefix: 'less', extName: extname }))
    .pipe(gless())
    .on('error', () => flog.error('Failed during typescript compilation'))
    .pipe(rename({ extname }))
    .pipe(gulp.dest(output));
};
