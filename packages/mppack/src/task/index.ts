import del from 'del';
import ylog from 'fancy-log';
import gulp from 'gulp';
import path from 'path';
import config from '../config';
import { changeFileExtname, getMpCssExtname } from '../util.';
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
    [config.typescript, typescript, '.js'],
    [config.image, image],
    [config.javascript, javascript],
    [config.json, json],
    [config.css, css, getMpCssExtname(config.target)],
    [config.less, less, getMpCssExtname(config.target)]
  ] as Array<[string[], () => void, string]>;

  const { output } = config;
  for (let [glob, handler, extname] of arr) {
    gulp.watch(glob, gulp.parallel(handler)).on('unlink', function(filepath) {
      const filePathFromSrc = path.relative(rootDir, filepath);
      // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
      let destFilePath = path.resolve(output, filePathFromSrc);
      if (extname) {
        destFilePath = changeFileExtname(destFilePath, extname);
      }
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
