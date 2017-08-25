import * as through2 from 'through2';
import opt from '../option';

export default function log() {
  return through2.obj((file, encoding, callback) => {
    //当前正在转换文件
    const relative: string = file.relative;
    //生成的目标文件的路径
    let destFile = relative;

    if (relative.endsWith('.ts')) {
      destFile = relative.replace('.ts', '.js');
    }

    console.log(`🙂 正在解析:> ${relative} => ${opt.output}/${destFile}`);
    callback(null, file);
  });
}
