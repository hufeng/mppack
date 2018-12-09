import debug from 'debug';
import gulp from 'gulp';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:wxss');

export const wxml = () => {
  const { output, target, wxml } = config;
  debugLog('output: %s, target: %s, css: %j', output, target, wxml);

  return gulp
    .src(wxml)
    .pipe(changed())
    .pipe(log({ prefix: 'wxml' }))
    .pipe(gulp.dest(output));
};
