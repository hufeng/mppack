import * as through2 from 'through2';

export default function traceFileLog(dest: string) {
  return through2.obj((file, encoding, callback) => {
    let relative = file.relative as string;
    if (relative.endsWith('.ts')) {
      relative = relative.replace('.ts', '.js');
    }
    console.log(`🙂 正在解析:> ${relative} => ${dest}/${relative}`);

    callback(null, file);
  });
}
