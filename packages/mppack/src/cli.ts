#!/usr/bin/env node
import program from 'commander';
import { say } from 'cowsay';
import debug from 'debug';
import log from 'fancy-log';
import fs from 'fs';
import path, { join } from 'path';
import util from 'util';
import config from './config';
import { start } from './task';
import { getDependencies } from './util';
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
  .option(
    '-m, --module [offline|online]',
    'offline copy node_modules, online npm install'
  )
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
  config.module = program.module || 'offline';
  config.target = program.target || 'eapp';

  const isNotUndefined = (val: any) => typeof val !== 'undefined';
  const configFile = program.config || path.join(rootDir, 'mppack.config.js');
  if (await isFileExist(configFile)) {
    log(`read config file: ${configFile}`);
    const cfg = require(path.join(__dirname, configFile));
    isNotUndefined(cfg.output) && (config.output = config.output);
    isNotUndefined(cfg.verbose) && (config.verbose = config.verbose);
    isNotUndefined(cfg.watch) && (config.watch = config.watch);
    isNotUndefined(cfg.target) && (config.target = config.target);
  } else {
    debugLog('no config file: %s', configFile);
  }
  const rootPkgJson = join(rootDir, 'package.json');
  const isRootPkgJSONExists = await isFileExist(rootPkgJson);
  if (isRootPkgJSONExists) {
    //检查依赖
    const deps = await getDependencies(rootPkgJson);
    debugLog('allDeps: %o', deps);
    config.dependencies = deps;
  } else {
    config.packagejson = false;
  }

  log(`当前mppack版本 => ${version}`);
  log(`输出目录 => ${config.output}`);
  log(`watch模式 => ${config.watch}`);
  log(`verbose模式 => ${config.verbose}`);
  if (!config.packagejson) {
    log('未扫描到package.json');
  } else {
    log(`module模式=> ${config.module}`);
  }
}
