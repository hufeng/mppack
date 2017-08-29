import * as gulp from 'gulp';
import { log, babelTransform } from '../plugin';
import opt from '../option';

/**
 * 解析image文件
 */
export default function resolveJS() {
  const { output } = opt;

  gulp
    .src([
      //扫描所有的js
      '**/*.png',
      '**/*.jpg',
      '**/*.gif',
      //排除ouput目录下面的js
      `!${output}/**`,
      //排除node_modules下面的js
      '!node_modules/**'
    ])
    //日志跟踪
    .pipe(log())
    //生成到目标目录
    .pipe(gulp.dest(output));
}
