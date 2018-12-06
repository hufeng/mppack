import debug from 'debug';
import gulp from 'gulp';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:json');

export const json = () => {
  const { output, json } = config;
  debugLog('output: %s, json: %j', output, json);
  return gulp
    .src(json)
    .pipe(changed())
    .pipe(log({ prefix: 'json' }))
    .pipe(gulp.dest(output));
};
