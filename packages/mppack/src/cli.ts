#!/usr/bin/env node
import program from 'commander';
import fs from 'fs';
import util from 'util';
import { build } from './task';

const version = require('../package.json').version;
const isFileExist = util.promisify(fs.exists);

program
  .version(version)
  .usage('[-o path]')
  .option('-o, --output [path]', 'Which bundle output')
  .option('-v, --verbose', 'show verbose log')
  .option('-w, --watch', 'watch mode')
  .option('-c, --config [file]', 'specify a config file')
  .parse(process.argv);

//main
(async () => {
  console.time('⛽️ build:time:|>');
  console.log(`🚀 🚀 mppack: ${version} 开始构建 `);

  //check是不是小程序的根目录
  //检查当前是不是小程序根目录
  const isWxProject = await isFileExist('app.json');

  if (!isWxProject) {
    console.warn(`
     😞  当前目录:|> ${process.cwd()}
     😞  不是小程序的根目录（没有包含app.json）
     🙂  请检查当前的文件路径
     `);
    return;
  }

  build(() => console.timeEnd('⛽️ build:time:|>'));
})();
