import debug from 'debug';
import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:js');

export const javascript = () => {
  const { javascript, output } = config;
  debugLog('output: %s, javascript:%j', output, javascript);

  return gulp
    .src(javascript)
    .pipe(plumber())
    .pipe(changed())
    .pipe(log({ prefix: 'js' }))
    .pipe(
      babel({
        plugins: ['mpapp-pack']
      })
    )
    .pipe(gulp.dest(output));
};
