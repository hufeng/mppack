import debug from 'debug';
import flog from 'fancy-log';
import { join } from 'path';
import through2 from 'through2';
import config from '../config';
import { ILogParam } from '../types';
import { changeFileExtname } from '../util.';

const debugLog = debug('mppack:plugin:log');

export const log = (param: ILogParam) => {
  const { output, verbose } = config;
  debugLog('output: %s verbose: %s', output, verbose);

  return through2.obj((file, _, cb) => {
    //如果没有开启详情模式
    if (!verbose) {
      cb(null, file);
      return;
    }

    //开启详情
    const { prefix, extName } = param;
    const src = file.relative;

    if (extName) {
      const dest = changeFileExtname(join(output, src), extName);
      flog(`${prefix}: ${src} => ${dest}`);
    } else {
      const dest = join(output, src);
      flog(`${prefix}: ${src} => ${dest}`);
    }

    cb(null, file);
  });
};
