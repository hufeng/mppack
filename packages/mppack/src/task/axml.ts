import debug from 'debug';
import gulp from 'gulp';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:wxss');

export const axml = () => {
  const { output, target, axml } = config;
  debugLog('output: %s, target: %s, css: %j', output, target, axml);

  return gulp
    .src(axml)
    .pipe(changed())
    .pipe(log({ prefix: 'axml' }))
    .pipe(gulp.dest(output));
};
