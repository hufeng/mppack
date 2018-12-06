import del from 'del';
import config from '../config';

export const clean = () => {
  return del(config.output);
};
