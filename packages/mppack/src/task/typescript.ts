import debug from 'debug';
import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:typescript');

export const typescript = () => {
  const { typescript, output } = config;
  debugLog('outout: %s, typescript: %j', output, typescript);

  return gulp
    .src(typescript)
    .pipe(plumber())
    .pipe(changed())
    .pipe(log({ prefix: 'ts', extName: '.js' }))
    .pipe(
      babel({
        presets: ['@babel/preset-typescript'],
        plugins: ['mpapp-pack']
      })
    )
    .pipe(gulp.dest(output));
};
