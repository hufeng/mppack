import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import { traceFileLog, babelTransform } from './plugin';

const tsProject = ts.createProject('tsconfig.json');

export default function resolveTs(dest: string) {
  gulp
    .src([
      //扫描所有的typescript文件
      '**/*.ts',
      //排除dest目录下的文件
      `!${dest}/**`,
      //排除node_modules下面的文件
      '!node_modules/**'
    ])
    .pipe(traceFileLog(dest))
    .pipe(tsProject())
    .js.pipe(babelTransform('module'))
    .pipe(gulp.dest(dest));
}
