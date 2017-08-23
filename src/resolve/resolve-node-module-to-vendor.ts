import * as fs from 'fs';
import { relative, dirname, resolve, join } from 'path';
import { isDir, fsExist, writeFile, babelTransfomeFile } from '../promisify';

//项目的根目录
const rootDir = process.cwd();

/**
 * 计算当前的文件相对于vendor的相对路径， 默认wxpacker会把node_module依赖
 * 放进{rootDir}/vendor
 * 
 * @param opts babel opts
 */
function moduleRelativeVendorPath(dirname) {
  return relative(dirname, 'vendor');
}

/**
 * 是不是绝对路径
 * @param module 
 */
function isAbsoluteModule(module) {
  return !/\./.test(module);
}

/**
 * babel的callexpression是不是require
 * @param path 
 */
function isRequire(path) {
  return path.get('callee').isIdentifier({ name: 'require' });
}

function resolveModuleDependencies(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      ImportDeclaration(path, opts) {
        const { node } = path;
        const { value } = node.source;
        const { file: { opts: { filename } } } = opts;

        //解析模块
        const modulePath = resolveNodeModule(value, filename);

        //如果是绝对路径改变为相对路径
        if (isAbsoluteModule(value)) {
          node.source.value = modulePath;
        }
      },

      CallExpression(path, opts) {
        if (!isRequire(path)) {
          return;
        }

        const { node } = path;
        //value is module name
        const value = node.arguments[0].value;

        //分析出来模块的文件路径是相对路径
        const { file: { opts: { filename } } } = opts;

        //解析模块
        const modulePath = resolveNodeModule(value, filename);

        if (isAbsoluteModule(value)) {
          node.arguments[0].value = modulePath;
        }
      }
    }
  };
}

export const resolveNodeModule = (moduleName: string, filename: string) => {
  if (!filename) {
    throw new Error(`${moduleName} had not filename`);
  }

  console.log(`🙂 正在解析node_modules模块：${moduleName}, 被${filename}引用`);

  //当前文件所在的目录
  const dir = dirname(filename);
  //模块完整的路径
  let modulePath = '';

  if (isAbsoluteModule(moduleName)) {
    //判断moduleName是不是包含子模块
    //比如： require('plume2') 或者 require('plume2/dist/actor')
    const isContainSlash = moduleName.includes('/');

    //解析出当前的模块路径
    modulePath = isContainSlash
      ? resolveNodeModuleSubModule(moduleName)
      : resolveNodeModuleMainEntry(moduleName);
  } else {
    modulePath = resolveRelativeModule(join(dir, moduleName));
  }

  console.log(`🙂 node_module模块：${moduleName} 解析完整的路径: ${modulePath}`);

  setImmediate(async () => {
    const { code, err } = await babelTransfomeFile(modulePath, {
      plugins: [resolveModuleDependencies]
    });

    if (err) {
      throw err;
    }

    const dest = rootDir + '/' + modulePath.replace('node_modules', 'vendor');

    //trace
    console.log(
      'vendor:|>',
      modulePath,
      modulePath.replace('node_modules', 'vendor')
    );

    writeFile(dest, code);
  });

  return modulePath.replace('node_modules', moduleRelativeVendorPath(dir));
};

/**
 * 解析node_module下面模块的入口
 * @param moduleName 模块名
 */
export const resolveNodeModuleMainEntry = (moduleName: string) => {
  //判断当前目录是否存在
  const nodeModulePath = `node_modules/${moduleName}`;
  const exist = fs.existsSync(nodeModulePath);
  if (!exist) {
    throw new Error(`Could not find ${nodeModulePath} `);
  }

  const pkg = require(`${rootDir}/node_modules/${moduleName}/package.json`);
  let { main } = pkg;

  //如果没有配置main，就去寻找index.js
  if (!main) {
    main = 'index.js';
  }

  const mainFile = join(nodeModulePath, main);
  return mainFile;
};

/**
 * 解析子目录
 * @param moduleName 模块名称
 */
export const resolveNodeModuleSubModule = (moduleName: string) => {
  let nodeModulePath = `node_modules/${moduleName}`;

  //如果子目录是目录寻找index.js
  try {
    const stat = fs.statSync(nodeModulePath);
    if (stat.isDirectory()) {
      return nodeModulePath + '/index';
    }
  } catch (err) {}

  //如果不是以js结尾，就补js
  if (!nodeModulePath.endsWith('.js')) {
    nodeModulePath += '.js';
  }

  const exist = fs.existsSync(nodeModulePath);
  if (!exist) {
    throw new Error(`Could not find ${nodeModulePath}`);
  }

  return nodeModulePath;
};

export const resolveRelativeModule = (modulePath: string) => {
  //如果模块路径以js结尾
  if (modulePath.endsWith('.js')) {
    const exist = fs.existsSync(modulePath);
    if (!exist) {
      throw new Error(`Could not find ${modulePath}`);
    }
  }

  modulePath = modulePath + '.js';
  const exist = fs.existsSync(modulePath);
  if (!exist) {
    modulePath = join(modulePath, 'index.js');
    const exist = fs.existsSync(modulePath);
    if (!exist) {
      throw new Error(`Could not find ${modulePath}`);
    }
  }

  return modulePath;
};
