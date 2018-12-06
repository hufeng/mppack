import { format, parse } from 'path';

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
