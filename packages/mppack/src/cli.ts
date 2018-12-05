#!/usr/bin/env node
import program from 'commander';
import { say } from 'cowsay';
import fs from 'fs';
import path from 'path';
import util from 'util';
import config from './config';
import { start } from './task';
const version = require('../package.json').version;
const isFileExist = util.promisify(fs.exists);

program
  .version(version)
  .usage('[-o path]')
  .option('-o, --output [path]', 'Which bundle output')
  .option('-v, --verbose', 'show verbose log')
  .option('-w, --watch', 'watch mode')
  .option('-c, --config [file]', 'specify a config file')
  .option('-t, --target [wxapp|eapp]', 'specify a platform target')
  .parse(process.argv);

//main
(async () => {
  console.log(say({ text: `🚀🚀mppack开始构建` }));
  console.time('⛽️ build:time:|>');

  //check是不是小程序的根目录
  //检查当前是不是小程序根目录
  const isWxProject = await isFileExist('app.json');

  if (!isWxProject) {
    console.warn(`😞当前mppack版本 => ${version}`);
    console.warn(`😞当前目录 => ${process.cwd()}`);
    console.warn(`😞不是小程序的根目录`);
    console.warn(`😞请检查当前的目录`);
    return;
  }

  await parseOption();
  start(config.watch, () => console.timeEnd('⛽️ build:time:|>'));
})();

/**
 * 解析可配置参数
 * 从配置项，从文件，文件会覆盖配置项
 */
async function parseOption() {
  //读取用户设置的参数
  config.output = program.output || 'build';
  config.watch = program.watch || false;
  config.verbose = program.verbose || false;

  const isNotUndefined = (val: any) => typeof val !== 'undefined';
  const configFile = program.config || 'mppack.config.js';

  if (await isFileExist(configFile)) {
    console.log(`read config file: ${configFile}`);
    const cfg = require(path.join(__dirname, configFile));
    isNotUndefined(cfg.output) && (config.output = config.output);
    isNotUndefined(cfg.verbose) && (config.verbose = config.verbose);
    isNotUndefined(cfg.watch) && (config.watch = config.watch);
  }

  console.log(`当前mppack版本 => ${version}`);
  console.log(`输出目录 => ${config.output}`);
  console.log(`watch模式 => ${config.watch}`);
  console.log(`verbose模式 => ${config.verbose}`);
}
