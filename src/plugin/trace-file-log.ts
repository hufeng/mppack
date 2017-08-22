import * as through2 from 'through2';

export default function traceFileLog(dest: string) {
  return through2.obj((file, encoding, callback) => {
    const relative = file.relative as string;
    let destFile = relative;
    if (relative.endsWith('.ts')) {
      destFile = relative.replace('.ts', '.js');
    }
    console.log(`🙂 正在解析:> ${relative} => ${dest}/${destFile}`);

    callback(null, file);
  });
}
