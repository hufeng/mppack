import debug from 'debug';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:image');

export const image = () => {
  const { output, image } = config;
  debugLog('output: %s, image: %j', output, image);

  return gulp
    .src(image)
    .pipe(changed())
    .pipe(log({ prefix: 'image' }))
    .pipe(imagemin())
    .pipe(gulp.dest(output));
};
