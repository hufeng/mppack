import debug from 'debug';
import gulp from 'gulp';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:wxss');

export const wxss = () => {
  const { output, target, wxss } = config;
  debugLog('output: %s, target: %s, css: %j', output, target, wxss);

  return gulp
    .src(wxss)
    .pipe(changed())
    .pipe(log({ prefix: 'wxss' }))
    .pipe(gulp.dest(output));
};
