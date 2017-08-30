"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const through2 = require("through2");
const babel = require("babel-core");
const babel_plugin_resolve_node_module_1 = require("./babel-plugin-resolve-node-module");
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
function babelTransform(type = 'file') {
    return through2.obj((file, encoding, callback) => {
        //如果不是js文件，返回
        if (!isJSFile(file.path)) {
            callback(null, file);
            return;
        }
        if (type === 'file') {
            //如果是js文件，进行babel的转换
            babel.transformFile(file.relative, { plugins: [babel_plugin_resolve_node_module_1.default] }, (err, result) => {
                if (err) {
                    throw err;
                }
                file.contents = new Buffer(result.code, 'utf8');
                callback(null, file);
            });
        }
        else if (type === 'module') {
            //用于typescript的转换后，babel再转换
            const code = babel.transform(file.contents, {
                plugins: [babel_plugin_resolve_node_module_1.default],
                filename: file.relative,
                filenameRelative: file.relative
            }).code;
            file.contents = new Buffer(code);
            callback(null, file);
        }
    });
}
exports.default = babelTransform;
