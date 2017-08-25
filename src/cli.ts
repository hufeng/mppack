#!/usr/bin/env node
import * as program from 'commander';
import { isFileExist } from './promisify';
import { version, opt, resolveJS, resolveResource, resolveTS } from './index';

program
  .version(version)
  .usage('[-o path]')
  .option('-o, --output [path]', 'Which bundle output')
  .option('-v, --verbose', 'show verbose log')
  .parse(process.argv);

//main
(async function main() {
  console.time('build:time:|>');
  console.log(`🚀 🚀 wxpacker: ${version} 开始构建 `);

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

  //获取目标目录
  opt.output = program.output || 'build';

  //解析资源文件
  resolveResource();

  //解析js
  resolveJS();

  //解析ts
  resolveTS();

  process.on('exit', () => {
    console.log('\n');
    console.timeEnd('build:time:|>');
    console.log('\n');
  });
})();
