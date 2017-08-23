#!/usr/bin/env node
import * as fs from 'fs';
import * as program from 'commander';
import resolveResource from './resolve/resolve-resource';
import resolveJS from './resolve/resolve-js';
import resolveTs from './resolve/resolve-ts';
import resolveModule from './resolve/resolve-module';

const version = require('../package.json').version;

program
  .version(version)
  .usage('[-o path]')
  .option('-o, --output [path]', 'Which bundle output')
  .option('-v, --verbose', 'show verbose log')
  .parse(process.argv);

//main
(function main() {
  console.log(`🚀 🚀 wxpacker: ${version} 开始构建 `);

  //检查当前是不是小程序根目录
  const isWxProject = fs.existsSync('app.json');
  if (!isWxProject) {
    console.log('😞 当前的目录不是小程序的根目录，请检查当前的文件路径');
    return;
  }

  //获取目标目录
  let dest = program.output;
  if (!dest) {
    console.warn('😓 么有指定output目录，默认-> build');
    dest = 'build';
  }

  //解析资源文件
  // resolveResource(dest);

  //解析js
  resolveJS(dest);

  //解析ts
  // resolveTs(dest);
})();
