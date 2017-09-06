import * as through2 from 'through2';
import * as babel from 'babel-core';
import option from '../../option';
import resolveNodeModule from './babel-plugin-resolve-node-module';

/**
 * 判断当前的文件是不是js文件
 * @param path 
 */
const isJSFile = path => {
  return /\.js$/.test(path);
};

/**
 * babelTransform-transform
 */
export default function babelTransform(type: 'module' | 'file' = 'file') {
  return through2.obj((file, encoding, callback) => {
    //如果不是js文件，返回
    if (!isJSFile(file.path)) {
      callback(null, file);
      return;
    }

    if (type === 'file') {
      //如果是js文件，进行babel的转换
      babel.transformFile(
        file.relative,
        { plugins: [resolveNodeModule] },
        (err, result) => {
          if (err) {
            throw err;
          }

          file.contents = new Buffer(result.code, 'utf8');
          callback(null, file);
        }
      );
    } else if (type === 'module') {
      //用于typescript的转换后，babel再转换
      const code = babel.transform(file.contents, {
        plugins: [resolveNodeModule],
        filename: file.relative,
        filenameRelative: file.relative
      }).code;
      file.contents = new Buffer(code);
      callback(null, file);
    }
  });
}
