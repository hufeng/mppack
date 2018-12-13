import debug from 'debug';
import { exists } from 'fs';
import { format, join, parse } from 'path';
import { promisify } from 'util';
const rootDir = process.cwd();
const isFileExist = promisify(exists);
const log = debug('mppack:util:getDeps:');

export const changeFileExtname = (filePath: string, extname: string) => {
  const meta = parse(filePath);
  meta.ext = extname;
  meta.base = meta.name + extname;

  return format(meta);
};

export const getMpCssExtname = (target: 'wxapp' | 'eapp') => {
  let extname = 'wxss';
  switch (target) {
    //微信
    case 'wxapp':
      extname = '.wxss';
      break;
    //钉钉e应用
    case 'eapp':
      extname = '.acss';
      break;
  }
  return extname;
};

/**
 * get package.json dependencies tree
 */
export const getDependencies = async (pkg: string) => {
  let depSet = [];
  //if package.json not found
  const isExists = await isFileExist(pkg);
  if (!isExists) {
    return depSet;
  }
  const { dependencies = {} } = require(pkg);
  log('get %s dependencies %o', pkg, Object.keys(dependencies));
  for (let dep in dependencies) {
    //FIXEDME check package.json cycle dependencies
    if (!depSet.includes(dep)) {
      depSet.push(dep);
    }
    const depPkg = join(rootDir, 'node_modules', dep, 'package.json');
    const depPkgList = await getDependencies(depPkg);
    depSet = [...depSet, ...depPkgList];
  }

  return depSet;
};
