"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("./fs");
exports.writeFile = fs_1.writeFile;
exports.isFileExist = fs_1.isFileExist;
exports.isDir = fs_1.isDir;
const babel_transform_file_1 = require("./babel-transform-file");
exports.babelTransformFile = babel_transform_file_1.default;
