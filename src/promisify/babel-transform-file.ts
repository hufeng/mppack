import * as babel from 'babel-core';
import opt from '../option';

export default function babelTransformFile(
  file: string,
  opts: Object
): Promise<{ code: string; err: Error }> {
  return new Promise(resolve => {
    if (opt.verbose) {
      console.log(`🙂 正在转换:|> ${file}`);
    }
    babel.transformFile(file, opts, (err, result) => {
      resolve({
        err,
        code: err ? '' : result.code
      });
    });
  });
}
