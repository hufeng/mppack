import debug from 'debug';
import { exists } from 'fs';
import { format, parse } from 'path';
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

export const getMpCssExtname = target => {
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
