import * as gulp from 'gulp';
import { traceFileLog } from '../plugin';

/**
 * sync json, wxml, wcss
 * 默认对小程序的资源文件不做处理，直接同步
 * 后期会支持一些模板的自定义功能👍
 * 
 * @param dest 目标路径 默认是build
 */
export default function syncResource(dest: string) {
  gulp
    .src([
      //扫描小程序的资源文件wxml, wcss, json
      `**/*.*(json|wxml|wxss)`,
      //排除
      '!package.json',
      //排除
      '!tsconfig.json',
      //排除目标目录
      `!${dest}/**`,
      //排除node_modules
      '!node_modules/**'
    ])
    //日志跟踪
    .pipe(traceFileLog(dest))
    //生成到目标目录
    .pipe(gulp.dest(dest));
}
