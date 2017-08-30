"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolveModule = require("./resolve-node-module-to-vendor");
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
 * 转换regeneratorRuntime
 * regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap()}
 * @param path
 */
const isRegeneratorRuntimeCall = path => {
    return path.get('callee.object').isIdentifier({ name: 'regeneratorRuntime' });
};
/**
 * 扫描node_modules模块
 * 小程序不支持绝对路径，也就是在代码里不能直接require('lodash')这样
 * 我们通过babel的ast分析出来这样的模块，找到这个模块在node_modules中的
 * 位置，然后拷贝到当前目录的vendor中去，作为第三方模块的依赖，
 * 同时把ast中的绝对路径依赖transform为对vendor内的模块的相对依赖
 * 另外小程序不支持对index.js模块的默认依赖
 *
 * 比如： 在pages/a/index.js
 *  require('immutable') => require('..')
 *
 *  transfrom =>
 *
 *  require('../../vendor/immutable/dist/immutable')
 *
 * 像go的处理方式 对 您说的对！！😝
 *
 * @param babel
 */
function resolveNodeModule(babel) {
    const { types: t } = babel;
    return {
        visitor: {
            /**
             * 分析ast，得到调用绝对路径的require依赖
             * 为什么只分析require，不分析import
             * 因为在babel中immport转化为require的时候，然后会调用一次CallExpression
             * 这样会导致多余的重复的执行以及各种模块的路径找不到
             * @param path
             * @param opts
             */
            CallExpression(path, opts) {
                /**
                 * 如果是regeneratorRuntime的函数调用，替换
                 */
                if (isRegeneratorRuntimeCall(path)) {
                    const { hub: { file } } = path;
                    const regeneratorRuntimeAst = file.addImport('regenerator-runtime', 'default', 'regeneratorRuntime');
                    path.node.callee.object = regeneratorRuntimeAst;
                    return;
                }
                //如果不是reuqire callexpression提前退出
                if (!isRequire(path)) {
                    return;
                }
                //当前的node节点
                const { node } = path;
                //模块名
                const value = node.arguments[0].value;
                if (isAbsoluteModule(value)) {
                    //获取当前正在分析的模块的模块名
                    const { file: { opts: { filename } } } = opts;
                    //计算模块的完整的路径名，
                    //如果 immutable => node_modules/immutable/dist/immutable.js
                    //然后得到相对于vendor中immutable的路径
                    const modulePath = resolveModule.resolveNodeModule(value, filename);
                    //改变ast中的模块依赖
                    node.arguments[0].value = modulePath;
                }
            }
        }
    };
}
exports.default = resolveNodeModule;
