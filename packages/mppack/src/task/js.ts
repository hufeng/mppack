import debug from 'debug';
import flog from 'fancy-log';
import gulp from 'gulp';
import babel from 'gulp-babel';
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
    .pipe(
      babel({
        presets: ['@babel/env', '@babel/preset-typescript'],
        plugins: ['mpapp-set-data']
      })
    )
    .on('error', (err: Error) =>
      flog.error(
        `Failed during javascript compilation, resulut: ${err.message}`
      )
    )
    .pipe(gulp.dest(output));
};
