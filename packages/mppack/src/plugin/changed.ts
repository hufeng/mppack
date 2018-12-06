import debug from 'debug';
import { close, fstat, open } from 'fs';
import through2 from 'through2';
import { TFilePath, TLastModifyTimestamp } from '../types';
const debugLog = debug('mppack:plugin:changed');

const cache: Map<TFilePath, TLastModifyTimestamp> = new Map();

export const changed = () =>
  through2.obj((file, _, cb) => {
    const src = file.relative;
    open(src, 'r', (err, fd) => {
      //open file descriptor
      //if err occured, skip
      if (err) {
        console.error(err.message);
        cb(null, file);
        return;
      }

      fstat(fd, (err, stat) => {
        if (err) {
          console.error(err.message);
          cb(null, file);
          return;
        }

        const mtimeMs = stat.mtimeMs;
        const cacheMtimeMs = cache.get(src) || 0;
        debugLog('time diff-> %d', mtimeMs - cacheMtimeMs);

        //first visit or modify the file
        if (!cacheMtimeMs || cacheMtimeMs < mtimeMs) {
          cache.set(src, mtimeMs);
          cb(null, file);
          return;
        } else {
          debugLog('checking %s changed: [N] ', src);
          //skip
          cb();
        }

        // 必须关闭文件描述符！
        close(fd, err => {
          if (err) throw err;
        });
      });
    });
  });
