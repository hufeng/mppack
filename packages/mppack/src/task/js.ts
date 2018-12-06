import debug from 'debug';
import gulp from 'gulp';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:js');

export const javascript = () => {
  const { javascript, output } = config;
  debugLog('output: %s, javascript:%j', output, javascript);

  return gulp
    .src(javascript)
    .pipe(changed())
    .pipe(log({ prefix: 'js' }))
    .pipe(gulp.dest(output));
};
