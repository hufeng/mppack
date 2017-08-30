"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const babel = require("babel-core");
const option_1 = require("../option");
function babelTransformFile(file, opts) {
    return new Promise(resolve => {
        if (option_1.default.verbose) {
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
exports.default = babelTransformFile;
