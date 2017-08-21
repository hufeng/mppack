import * as through2 from 'through2';

export default function traceFileLog(dest: string) {
  return through2.obj((file, encoding, callback) => {
    const path = file.relative;
    console.log(`🙂 正在解析:> ${path} => ${dest}/${path}`);

    callback(null, file);
  });
}
