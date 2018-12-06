import debug from 'debug';
import gulp from 'gulp';
import rename from 'gulp-rename';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
import { getMpCssExtname } from '../util.';
const debugLog = debug('mppack:task:css');

export const css = () => {
  const { output, target, css } = config;
  let extname = getMpCssExtname(target);

  debugLog(
    'output: %s, target: %s, extname: %s, css: %j',
    output,
    target,
    extname,
    css
  );

  return gulp
    .src(css)
    .pipe(changed())
    .pipe(log({ prefix: 'css', extName: extname }))
    .pipe(rename({ extname }))
    .pipe(gulp.dest(output));
};
