import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import { log, babelTransform } from '../plugin';
import opts from '../option';

const tsProject = ts.createProject('tsconfig.json');

export default function resolveTs() {
  const { output } = opts;

  gulp
    .src([
      //扫描所有的typescript文件
      '**/*.ts',
      '!vendor/**',
      //排除dest目录下的文件
      `!${output}/**`,
      //排除node_modules下面的文件
      '!node_modules/**'
    ])
    .pipe(log())
    .pipe(tsProject())
    .js.pipe(babelTransform('module'))
    .pipe(gulp.dest(output));
}
