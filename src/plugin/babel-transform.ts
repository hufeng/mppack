import * as fs from 'fs';
import * as path from 'path';
import * as through2 from 'through2';
import * as babel from 'babel-core';
import resolveNodeModule from './babel-plugin-resolve-node-module';

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
  const babelrc = fs.readFileSync(babelrcPath).toString() || '{}';
  const babelrcJSON = JSON.parse(babelrc);
  babelrcJSON.plugins = babelrcJSON.plugins || [];
  babelrcJSON.plugins.push([resolveNodeModule]);
  return babelrcJSON;
};

/**
 * babelTransform-transform
 */
export default function babelTransform(type: 'module' | 'file' = 'file') {
  const opts = babelrc();

  return through2.obj((file, encoding, callback) => {
    //如果不是js文件，返回
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
    } else if (type === 'module') {
      //设置文件名
      opts.filename = file.relative;
      opts.filenameRelative = file.relative;

      //文件内容babel转换
      const code = babel.transform(file.contents, opts).code;
      file.contents = new Buffer(code);
      callback(null, file);
    }
  });
}
