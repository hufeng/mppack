import * as gulp from 'gulp';
import { log } from '../plugin';
import Resolver, { IPattern } from './resolver';

/**
 * 图片resolver
 */
export default class ImageResolver extends Resolver {
  /**
   * 当前过滤的pattern
   */
  pattern() {
    return [
      //扫描所有的js
      '**/*.png',
      '**/*.jpg',
      '**/*.gif',
      //排除ouput目录下面的js
      `!${this.output}/**`,
      //排除node_modules下面的js
      '!node_modules/**'
    ];
  }

  /**
   * 转换函数
   * @param pattern 
   */
  transform(pattern: IPattern) {
    gulp
      .src(pattern)
      //日志跟踪
      .pipe(log())
      //生成到目标目录
      .pipe(gulp.dest(this.output));
  }
}
