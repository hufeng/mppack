#!/usr/bin/env node
import * as path from 'path';
import * as program from 'commander';
import { isFileExist } from './promisify';
import {
  version,
  opt,
  ResourceResolver,
  ImageResolver,
  JavascriptResolver,
  TypescriptResolver
} from './index';

/**
 * cli
 */
program
  .version(version)
  .usage('[-o path]')
  .option('-o, --output [path]', 'Which bundle output')
  .option('-v, --verbose', 'show verbose log')
  .option('-w, --watch', 'watch mode')
  .option('-c, --config [file]', 'specify a config file')
  .parse(process.argv);

//main
(async function main() {
  console.time('⛽️ build:time:|>');
  console.log(`🚀 🚀 wxpack: ${version} 开始构建 `);

  //check是不是小程序的根目录
  //检查当前是不是小程序根目录
  const isWxProject = await isFileExist('app.json');

  if (!isWxProject) {
    console.log(`
     😞  当前目录:|>${process.cwd()}
     😞  不是小程序的根目录（没有包含app.json）
     🙂  请检查当前的文件路径
     `);
    return;
  }

  //等待配置项解析
  await parseOption();

  //解析资源文件
  new ResourceResolver();

  //解析js
  new JavascriptResolver();

  //解析ts
  new TypescriptResolver();

  //解析image
  new ImageResolver();

  //如果不是watchmode记录下编译时间
  if (!opt.watchMode) {
    process.on('exit', () => {
      console.log('\n');
      console.timeEnd('⛽️ build:time:|>');
      console.log('\n');
    });
  }
})();

/**
 * 解析可配置参数
 * 从配置项，从文件，文件会覆盖配置项
 */
async function parseOption() {
  //读取用户设置的参数
  opt.output = program.output || 'build';
  opt.watchMode = program.watch || false;
  opt.verbose = program.verbose || false;

  const isNotUndefined = (val: any) => typeof val !== 'undefined';
  const configFile = program.config || 'wxpack.config.js';
  //如果设置了配置文件
  const isConfigFile = await isFileExist(configFile);
  if (isConfigFile) {
    console.log(`read config file: ${configFile}`);
    const filePath = path.resolve(configFile);
    const config = require(filePath);

    isNotUndefined(config.output) && (opt.output = config.output);
    isNotUndefined(config.verbose) && (opt.verbose = config.verbose);
    isNotUndefined(config.watchMode) && (opt.watchMode = config.watchMode);
  }

  console.log(`
  输出目录: ${opt.output}
  watch模式: ${opt.watchMode}
  verbose模式: ${opt.verbose}
  `);
}
