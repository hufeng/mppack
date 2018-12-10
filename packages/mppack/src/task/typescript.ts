import debug from 'debug';
import flog from 'fancy-log';
import { existsSync } from 'fs';
import gulp from 'gulp';
import ts from 'gulp-typescript';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:ts');

export const typescript = () => {
  const { typescript, output } = config;
  debugLog('outout: %s, typescript: %j', output, typescript);

  const isExist = existsSync('tsconfig.json');

  let tsProject = isExist
    ? ts.createProject('tsconfig.json')
    : ts.createProject({
        target: 'es2015',
        module: 'es2015',
        strict: true,
        noImplicitAny: false,
        strictNullChecks: false,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        moduleResolution: 'node',
        esModuleInterop: true
      });

  return gulp
    .src(typescript)
    .pipe(changed())
    .pipe(log({ prefix: 'ts', extName: '.js' }))
    .pipe(tsProject())
    .on('error', () => flog.error('Failed during typescript compilation'))
    .pipe(gulp.dest(output));
};
