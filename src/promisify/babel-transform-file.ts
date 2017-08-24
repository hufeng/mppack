import * as babel from 'babel-core';
import * as fs from 'fs';

export default function transformFile(
  file: string,
  opts: Object
): Promise<{ code: string; err: Error }> {
  return new Promise(resolve => {
    console.log('🙂 正在转换: ' + file);
    babel.transformFile(file, opts, (err, result) => {
      resolve({
        err,
        code: result.code
      });
    });
  });
}
