import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import { traceFileLog, babelTransform } from './plugin';

const tsProject = ts.createProject('tsconfig.json');

export default function resolveTs(dest: string) {
  gulp
    .src(['**/*.ts', `!${dest}/**`, '!node_modules/**'])
    .pipe(traceFileLog(dest))
    .pipe(tsProject())
    .pipe(babelTransform('module'))
    .pipe(gulp.dest(dest));
}
