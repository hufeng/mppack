import * as fs from 'fs';
import * as gulp from 'gulp';
import option from '../option';

export interface IResolver {
  pattern(): IPattern;
  transform(pattern: IPattern): void;
  watch(): void;
}

export interface IEvent {
  type: 'deleted' | 'added' | 'changed';
  path: string;
}

export type IPattern = Array<string> | string;

const rootDir = process.cwd();

export default class Resolver implements IResolver {
  private _output: string;
  private _watchMode: boolean;

  constructor() {
    const { output, watchMode } = option;
    this._output = output;
    this._watchMode = watchMode;

    this.watch();
    this.transform(this.pattern());
  }

  /**
   * transform
   * @param pattern 
   */
  transform(pattern: IPattern) {
    console.log(pattern);
    throw new Error('not implemention');
  }

  /**
   * watchMode
   */
  watch() {
    //如果不是watchMode直接返回
    if (!this.watchMode) {
      return;
    }

    gulp.watch(this.pattern()).on('change', (event: IEvent) => {
      const { path, type } = event;
      console.log(`file changed: ${path}, type: ${type}`);

      if (type == 'deleted') {
        let dest = path.replace(rootDir, `${rootDir}/build`);
        if (dest.endsWith('.ts')) {
          dest = dest.replace('.ts', '.js');
        }

        fs.unlink(dest, err => {
          if (err) {
            console.warn(err);
          }
        });
        return;
      }

      this.transform([path.replace(rootDir, '**'), `!${this.output}/**`]);
    });
  }

  /**
   * 获得文件的pattern
   */
  pattern() {
    return [];
  }

  get output() {
    return this._output;
  }

  get watchMode() {
    return this._watchMode;
  }
}
