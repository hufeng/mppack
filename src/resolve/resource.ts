import * as gulp from 'gulp';
import { log } from '../plugin';
import Resolver, { IPattern } from './resolver';

/**
 * sync json, wxml, wcss
 * 默认对小程序的资源文件不做处理，直接同步
 * 后期会支持一些模板的自定义功能👍
 */
export default class ResourceResovler extends Resolver {
  pattern() {
    return [
      //扫描小程序的资源文件wxml, wcss, json
      `**/*.*(json|wxml|wxss)`,
      //排除
      '!package.json',
      '!package-lock.json',
      //排除
      '!tsconfig.json',
      //排除目标目录
      `!${this.output}/**`,
      //排除node_modules
      '!node_modules/**'
    ];
  }

  transform(pattern: IPattern) {
    gulp
      .src(pattern)
      //日志跟踪
      .pipe(log())
      //生成到目标目录
      .pipe(gulp.dest(this.output));
  }
}
