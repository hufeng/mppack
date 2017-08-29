import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import { log, babelTransform } from '../plugin';
import Resolver, { IPattern } from './resolver';

const tsProject = ts.createProject('tsconfig.json');

/**
 * typescript
 */
export default class TypeScriptResolver extends Resolver {
  pattern() {
    return [
      //扫描所有的typescript文件
      '**/*.ts',
      '!vendor/**',
      //排除dest目录下的文件
      `!${this.output}/**`,
      //排除node_modules下面的文件
      '!node_modules/**'
    ];
  }

  transform(pattern: IPattern) {
    gulp
      .src(pattern)
      .pipe(log())
      .pipe(tsProject())
      .js.pipe(babelTransform('module'))
      .pipe(gulp.dest(this.output));
  }
}
