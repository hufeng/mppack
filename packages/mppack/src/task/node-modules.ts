import { exec } from 'child_process';
import debug from 'debug';
import log from 'fancy-log';
import { copyFile, exists, mkdir } from 'fs';
import { join } from 'path';
import { debuglog, promisify } from 'util';
import config from '../config';
import { log as logPlugin } from '../plugin/log';
import gulp = require('gulp');
const debugLog = debug('mppack:task:node_modules');
const execPromisify = promisify(exec);
const copyFilePromisify = promisify(copyFile);
const rootDir = process.cwd();
const isFileExist = promisify(exists);
const makeDirPromisify = promisify(mkdir);

export const nodeModulesOnline = async (cb: Function) => {
  try {
    const isExist = await isFileExist(join(rootDir, config.output));
    debugLog('output %s dir is existed? %s', config.output, isExist);
    if (!isExist) {
      await makeDirPromisify(join(rootDir, config.output));
    }

    await copyFilePromisify(
      join(rootDir, 'package.json'),
      join(rootDir, config.output, 'package.json')
    );

    log('npm install....');
    const { stdout, stderr } = await execPromisify('npm install --production', {
      cwd: config.output
    });
    log('stdout:', stdout);
    log.error('stderr:', stderr);
    cb();
  } catch (err) {
    console.log(err);
    debuglog(err);
    log.error(err);
    cb(err);
  }
};

export const nodeModulesOffline = () => {
  const { node_modules, output } = config;
  return gulp
    .src(node_modules, { base: './' })
    .pipe(
      logPlugin({
        prefix: 'node_modules'
      })
    )
    .pipe(gulp.dest(output));
};

export const nodeModules = (cb: Function) => {
  return config.module === 'offline'
    ? nodeModulesOffline()
    : nodeModulesOnline(cb);
};
