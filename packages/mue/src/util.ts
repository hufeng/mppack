import { TPath } from './types';

export const getPathVal = (data: Object, path: TPath) =>
  (Array.isArray(path) ? path : [path]).reduce(
    (data, node) => data[node],
    data
  );
