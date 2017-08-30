"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs_1 = require("fs");
const util_1 = require("util");
const fs = require("fs-extra");
/**
 * 当前文件是否存在
 */
exports.isFileExist = util_1.promisify(fs_1.exists);
/**
 * 判断当前的路径是不是目录
 */
exports.isDir = (file) => new Promise(resolve => {
    fs_1.stat(file, (err, res) => {
        resolve(err ? false : res.isDirectory());
    });
});
/**
 * 写文件
 * @param file
 * @param data
 */
exports.writeFile = (file, data) => __awaiter(this, void 0, void 0, function* () {
    const dir = path.dirname(file);
    const isExist = yield exports.isFileExist(dir);
    //如果目录不存在，先创建目录
    if (!isExist) {
        yield fs.mkdirp(dir);
    }
    yield fs.writeFile(file, data, { encoding: 'utf8' });
});
