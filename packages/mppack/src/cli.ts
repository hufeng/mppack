#!/usr/bin/env node
import program from 'commander';
import { say } from 'cowsay';
import debug from 'debug';
import log from 'fancy-log';
import fs from 'fs';
import path from 'path';
import util from 'util';
import config from './config';
import { start } from './task';
const version = require('../package.json').version;
const isFileExist = util.promisify(fs.exists);
const rootDir = process.cwd();
const debugLog = debug('mppack:cli');

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
  console.log(say({ text: `🚀🚀mppack@${version}开始为您构建` }));
  console.time('⛽️ finish |>');

  //check是不是小程序的根目录
  //检查当前是不是小程序根目录
  const isWxProject = await isFileExist('app.json');

  if (!isWxProject) {
    log(`😞当前mppack版本 => ${version}`);
    log(`😞当前目录 => ${process.cwd()}`);
    log(`😞不是小程序的根目录`);
    log(`😞请检查当前的目录`);
    return;
  }

  await parseOption();
  start(config.watch, () => console.timeEnd('⛽️ finish |>'));
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
  const configFile = program.config || path.join(rootDir, 'mppack.config.js');
  if (await isFileExist(configFile)) {
    log(`read config file: ${configFile}`);
    const cfg = require(path.join(__dirname, configFile));
    isNotUndefined(cfg.output) && (config.output = config.output);
    isNotUndefined(cfg.verbose) && (config.verbose = config.verbose);
    isNotUndefined(cfg.watch) && (config.watch = config.watch);
  } else {
    debugLog('no config file: %s', configFile);
  }

  log(`当前mppack版本 => ${version}`);
  log(`输出目录 => ${config.output}`);
  log(`watch模式 => ${config.watch}`);
  log(`verbose模式 => ${config.verbose}`);
}
