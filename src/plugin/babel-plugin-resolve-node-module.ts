import { dirname, relative } from 'path';
import * as resolveModule from '../resolve/resolve-node-module-to-vendor';

/**
 * 判断当前的模块是不是绝对路径
 * @param moduleName 
 */
const isAbsoluteModule = moduleName => {
  return !/\./.test(moduleName);
};

/**
 * 判断babel的callExpression是不是require
 * @param path babel ast node
 */
const isRequire = path => {
  return path.get('callee').isIdentifier({ name: 'require' });
};

/**
 * 扫描node_modules模块
 * @param babel 
 */
export default function resolveNodeModule(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      CallExpression(path, opts) {
        //如果不是reuqire callexpression提前退出
        if (!isRequire(path)) {
          return;
        }

        const { node } = path;
        //module name
        const value = node.arguments[0].value;

        if (isAbsoluteModule(value)) {
          //分析出来模块的文件路径是相对路径
          const { file: { opts: { filename } } } = opts;
          //计算模块的完整的路径名
          const modulePath = resolveModule.resolveNodeModule(value, filename);
          //相对路径的替换
          node.arguments[0].value = modulePath;
        }
      }
    }
  };
}
