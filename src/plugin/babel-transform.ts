import * as fs from 'fs';
import * as path from 'path';
import * as through2 from 'through2';
import * as babel from 'babel-core';

/**
 * 判断当前的文件是不是js文件
 * @param path 
 */
const isJSFile = path => {
  return /\.js$/.test(path);
};

/**
 * 获取项目根目录的babelrc的配置文件
 */
const babelrc = () => {
  const babelrcPath = path.join(process.cwd(), '.babelrc');
  const babelrcContent = fs.readFileSync(babelrcPath).toString() || '{}';
  return JSON.parse(babelrcContent);
};

/**
 * babelTransform-transform
 */
export default function babelTransform(type: 'module' | 'file' = 'file') {
  const opts = babelrc();

  return through2.obj((file, encoding, callback) => {
    //如果不是js文件，即可返回
    if (!isJSFile(file.path)) {
      callback(null, file);
      return;
    }

    //文件转换
    if (type === 'file') {
      //如果是js文件，进行babel的转换
      babel.transformFile(file.relative, opts, (err, result) => {
        if (err) {
          throw err;
        }
        file.contents = new Buffer(result.code, 'utf8');
        callback(null, file);
      });
    }
    //文件内容babel转换
    else if (type === 'module') {
      const code = babel.transform(file.contents, opts).code;
      file.contents = new Buffer(code);
      callback(null, file);
    }
  });
}
