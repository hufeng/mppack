#!/usr/bin/env node
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
const program = require("commander");
const promisify_1 = require("./promisify");
const index_1 = require("./index");
program
    .version(index_1.version)
    .usage('[-o path]')
    .option('-o, --output [path]', 'Which bundle output')
    .option('-v, --verbose', 'show verbose log')
    .option('-w, --watch', 'watch mode')
    .option('-c, --config [file]', 'specify a config file')
    .parse(process.argv);
const parseOption = () => __awaiter(this, void 0, void 0, function* () {
    //读取用户设置的参数
    index_1.opt.output = program.output || 'build';
    index_1.opt.watchMode = program.watch || false;
    index_1.opt.verbose = program.verbose || false;
    const configFile = program.config || 'wxpack.config.js';
    //如果设置了配置文件
    const isConfigFile = yield promisify_1.isFileExist(configFile);
    if (isConfigFile) {
        console.log(`read config file: ${configFile}`);
        const filePath = path.resolve(configFile);
        const config = require(filePath);
        config.output && (index_1.opt.output = config.output);
        config.verbose && (index_1.opt.verbose = config.verbose);
        config.watchMode && (index_1.opt.watchMode = config.watchMode);
    }
    console.log(`
  输出目录: ${index_1.opt.output}
  watch模式: ${index_1.opt.watchMode}
  verbose模式: ${index_1.opt.verbose}
  `);
});
//main
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.time('⛽️ build:time:|>');
        console.log(`🚀 🚀 wxpack: ${index_1.version} 开始构建 `);
        //检查当前是不是小程序根目录
        const isWxProject = yield promisify_1.isFileExist('app.json');
        if (!isWxProject) {
            console.log(`
    😞  当前目录:|>${process.cwd()}
    😞  不是小程序的根目录（没有包含app.json）
    🙂  请检查当前的文件路径
    `);
            return;
        }
        //等待配置项解析
        yield parseOption();
        //解析资源文件
        new index_1.ResourceResolver();
        //解析js
        new index_1.JavascriptResolver();
        //解析ts
        new index_1.TypescriptResolver();
        //解析image
        new index_1.ImageResolver();
        //如果不是watchmode记录下编译时间
        if (!index_1.opt.watchMode) {
            process.on('exit', () => {
                console.log('\n');
                console.timeEnd('⛽️ build:time:|>');
                console.log('\n');
            });
        }
    });
})();
