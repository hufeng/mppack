import { TPath } from './types';

export const getPathVal = (data: Object, path: TPath) =>
  (Array.isArray(path) ? path : [path]).reduce(
    //@ts-ignore
    (data, node) => data[node],
    data
  );
