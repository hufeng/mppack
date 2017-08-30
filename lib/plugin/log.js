"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const through2 = require("through2");
const option_1 = require("../option");
function log() {
    return through2.obj((file, encoding, callback) => {
        //如果不是详情模式
        if (!option_1.default.verbose) {
            callback(null, file);
            return;
        }
        //当前正在转换文件
        const relative = file.relative;
        //生成的目标文件的路径
        let destFile = relative;
        if (relative.endsWith('.ts')) {
            destFile = relative.replace('.ts', '.js');
        }
        console.log(`🙂 正在解析:> ${relative} => ${option_1.default.output}/${destFile}`);
        callback(null, file);
    });
}
exports.default = log;
