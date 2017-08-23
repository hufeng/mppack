import * as path from 'path';
import { exists, stat } from 'fs';
import { promisify } from 'util';
import * as fs from 'fs-extra';

export const fsExist = promisify(exists);

export const isDir = (file: string) => {
  return new Promise(resolve => {
    stat(file, (err, res) => {
      resolve(err ? false : res.isDirectory());
    });
  });
};

export const writeFile = async (file: string, data: string) => {
  const dir = path.dirname(file);
  const isExist = await fsExist(dir);

  if (!isExist) {
    await fs.mkdirp(dir);
  }

  await fs.writeFile(file, data, { encoding: 'utf8' });
};
