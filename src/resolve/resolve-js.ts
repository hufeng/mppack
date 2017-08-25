import * as gulp from 'gulp';
import { log, babelTransform } from '../plugin';
import opt from '../option';

/**
 * 解析js文件，进行babel-transform
 */
export default function resolveJS() {
  const {output} = opt;

  gulp
    .src([
      //扫描所有的js
      '**/*.js',
      //排除ouput目录下面的js
      `!${output}/**`,
      //排除node_modules下面的js
      '!node_modules/**'
    ])
    //日志跟踪
    .pipe(log())
    //babel转换
    .pipe(babelTransform())
    //生成到目标目录
    .pipe(gulp.dest(output));
}
