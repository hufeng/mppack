import * as gulp from 'gulp';
import { log, babelTransform } from '../plugin';
import Resolver, { IPattern } from './resolver';

/**
 * 解析js文件，进行babel-transform
 */
export default class JSResolver extends Resolver {
  pattern() {
    return [
      //扫描所有的js
      '**/*.js',
      //排除ouput目录下面的js
      `!${this.output}/**`,
      //排除node_modules下面的js
      '!node_modules/**'
    ];
  }

  /**
   * 转换
   * @param pattern 
   */
  transform(pattern: IPattern) {
    gulp
      .src(pattern)
      //日志跟踪
      .pipe(log())
      //babel转换
      .pipe(babelTransform())
      //生成到目标目录
      .pipe(gulp.dest(this.output));
  }
}
