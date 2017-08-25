import * as fs from 'fs';
import { relative, dirname, resolve, join } from 'path';
import { isDir, fsExist, writeFile, babelTransfomeFile } from '../promisify';
import cfg from '../config';

//项目的根目录
const rootDir = process.cwd();

const cacheModulePath = [];

/**
 * 计算当前的文件相对于vendor的相对路径， 默认wxpacker会把node_module依赖
 * 放进{rootDir}/vendor
 * 
 * @param opts babel opts
 */
function moduleRelativeVendorPath(modulePath: string) {
  return relative(dirname(modulePath), 'vendor');
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
      CallExpression(path, opts) {
        if (!isRequire(path)) {
          return;
        }

        const { node } = path;
        //value is module name
        const value: string = node.arguments[0].value;

        //分析出来模块的文件路径是相对路径
        const { file: { opts: { filename } } } = opts;
        //解析模块
        const modulePath = resolveNodeModule(value, filename);
        node.arguments[0].value = modulePath;
      }
    }
  };
}

export const resolveNodeModule = (moduleName: string, filename: string) => {
  if (!filename) {
    throw new Error(`${moduleName} had not filename`);
  }

  console.log(`🙂 正在解析:> ${moduleName}, 被${filename}引用`);

  //模块完整的路径
  let nodeModulePath = '';
  //替换module的path，绝对路径相对于vendor,相对路径相对于当前的目录
  let transformAstRequirePath = '';

  if (isAbsoluteModule(moduleName)) {
    //判断moduleName是不是包含子模块
    //比如： require('plume2') 或者 require('plume2/dist/actor')
    const isContainSlash = moduleName.includes('/');

    //解析出当前的模块路径
    nodeModulePath = isContainSlash
      ? resolveNodeModuleSubModule(moduleName)
      : resolveNodeModuleMainEntry(moduleName);
    transformAstRequirePath = nodeModulePath.replace(
      'node_modules',
      moduleRelativeVendorPath(filename)
    );
  } else {
    nodeModulePath = resolveRelativeModule(join(dirname(filename), moduleName));
    //计算相对路径的ast替换的路径
    transformAstRequirePath = relative(dirname(filename), nodeModulePath);
    //如果是当前的目录，补充./
    if (!transformAstRequirePath.startsWith('.')) {
      transformAstRequirePath = './' + transformAstRequirePath;
    }
  }

  console.log(`🙂 模块:> ${moduleName} 解析完整的路径: ${nodeModulePath}`);

  (async () => {
    //如果已经转换过，直接返回
    if (cacheModulePath.indexOf(nodeModulePath) != -1) {
      return;
    }

    const { code, err } = await babelTransfomeFile(nodeModulePath, {
      plugins: [resolveModuleDependencies]
    });

    //记录已经transform的模块
    cacheModulePath.push(nodeModulePath);

    if (err) {
      throw err;
    }

    const dest =
      rootDir +
      `/${cfg.dest}/` +
      nodeModulePath.replace('node_modules', 'vendor');

    //trace
    console.log(
      '🙂 vendor:|>',
      nodeModulePath,
      nodeModulePath.replace('node_modules', 'vendor')
    );

    writeFile(dest, code);
  })();

  //删除.js 减少js的体积
  return transformAstRequirePath.slice(0, -3);
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

  //判断是不是js文件，优先匹配文件， 在匹配目录下的index.js
  const exist = fs.existsSync(modulePath + '.js');
  if (!exist) {
    modulePath = join(modulePath, 'index');
    const exist = fs.existsSync(modulePath + '.js');
    if (!exist) {
      throw new Error(`Could not find ${modulePath}`);
    }
  }

  return modulePath + '.js';
};
