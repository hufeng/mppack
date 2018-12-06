import debug from 'debug';
import gulp from 'gulp';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:wxss');

export const acss = () => {
  const { output, target, acss } = config;
  debugLog('output: %s, target: %s, css: %j', output, target, acss);

  return gulp
    .src(acss)
    .pipe(changed())
    .pipe(log({ prefix: 'acss' }))
    .pipe(gulp.dest(output));
};
