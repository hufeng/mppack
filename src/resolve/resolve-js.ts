import * as gulp from 'gulp';
import { traceFileLog, babelTransform } from '../plugin';

/**
 * 解析js文件，进行babel-transform
 *
 * @param dest 生成代码到目标目录
 */
export default function resolveJS(dest: string) {
  gulp
    .src([
      //扫描所有的js
      '**/*.js',
      '!fofo/**',
      '!vendor/**',
      //排除dest目录下面的js
      `!${dest}/**`,
      //排除node_modules下面的js
      '!node_modules/**'
    ])
    //日志跟踪
    .pipe(traceFileLog(dest))
    //babel转换
    .pipe(babelTransform())
    //生成到目标目录
    .pipe(gulp.dest(dest));
}
