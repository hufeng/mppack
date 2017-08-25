import * as path from 'path';
import { exists, stat } from 'fs';
import { promisify } from 'util';
import * as fs from 'fs-extra';

/**
 * 当前文件是否存在
 */
export const isFileExist = promisify(exists);

/**
 * 判断当前的路径是不是目录
 */
export const isDir = (file: string) =>
  new Promise(resolve => {
    stat(file, (err, res) => {
      resolve(err ? false : res.isDirectory());
    });
  });

/**
 * 写文件
 * @param file 
 * @param data 
 */
export const writeFile = async (file: string, data: string) => {
  const dir = path.dirname(file);
  const isExist = await isFileExist(dir);

  //如果目录不存在，先创建目录
  if (!isExist) {
    await fs.mkdirp(dir);
  }

  await fs.writeFile(file, data, { encoding: 'utf8' });
};
