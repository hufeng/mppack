import debug from 'debug';
import flog from 'fancy-log';
import gulp from 'gulp';
import babel from 'gulp-babel';
import config from '../config';
import { changed } from '../plugin/changed';
import { log } from '../plugin/log';
const debugLog = debug('mppack:task:typescript');

export const typescript = () => {
  const { typescript, output } = config;
  debugLog('outout: %s, typescript: %j', output, typescript);

  /* const isExist = existsSync('tsconfig.json');

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
      });*/

  return gulp
    .src(typescript)
    .pipe(changed())
    .pipe(log({ prefix: 'ts', extName: '.js' }))
    .pipe(
      babel({
        // presets: ['@babel/env', '@babel/preset-typescript'],
        // plugins: ['mpapp-set-data']
      })
    )
    .on('error', (err: Error) =>
      flog.error(`Failed during typescript compilation, reason:${err.message}`)
    )
    .pipe(gulp.dest(output));
};
