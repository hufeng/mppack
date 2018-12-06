import del from 'del';
import ylog from 'fancy-log';
import gulp from 'gulp';
import path from 'path';
import config from '../config';
import { clean } from './clean';
import { css } from './css';
import { image } from './image';
import { javascript } from './js';
import { json } from './json';
import { less } from './less';
import { typescript } from './typescript';
const rootDir = process.cwd();

export const watch = () => {
  const arr = [
    [config.typescript, typescript],
    [config.image, image],
    [config.javascript, javascript],
    [config.json, json],
    [config.css, css],
    [config.less, less]
  ] as Array<[string[], () => void]>;

  const { output } = config;
  for (let [glob, handler] of arr) {
    gulp.watch(glob, gulp.parallel(handler)).on('unlink', function(filepath) {
      var filePathFromSrc = path.relative(rootDir, filepath);
      // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
      var destFilePath = path.resolve(output, filePathFromSrc);
      ylog(`delete: ${filePathFromSrc} =>${destFilePath}`);
      del.sync(destFilePath);
    });
  }
};

export const build = gulp.series(
  clean,
  gulp.parallel(typescript, image, less, css, json, javascript)
);

export const start = (watchMode: boolean, cb: Function) => {
  build(() => {
    cb();
    if (watchMode) {
      ylog('watching...');
      watch();
    }
  });
};
