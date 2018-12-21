const { addDefault } = require('@babel/helper-module-imports');

/**
 * 转换 regeneratorRuntime
 * regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap()}
 * @param path
 */
const isRegeneratorRuntimeCall = path => {
  return path.get('callee.object').isIdentifier({ name: 'regeneratorRuntime' });
};

/**
 * 导入regenerator-runtime
 */
const importRegeneratorRuntime = (path, state) => {
  if (state.id) {
    return state.id;
  }

  state.id = addDefault(path, 'regenerator-runtime', {
    nameHint: '_regeneratorRuntime'
  });

  return state.id;
};

module.exports = function(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      CallExpression(path) {
        //解决@babel/preset-env 少导入regenerator-runtime的问题
        //这样可以最简单的再微信小程序里支持async/await
        if (isRegeneratorRuntimeCall(path)) {
          id = importRegeneratorRuntime(path, this);
          path.node.callee.object = id;
          return;
        }

        const {
          node: { callee }
        } = path;
        const fnName = callee.name;
        if (fnName === 'Mixin' || fnName === 'Mue' || fnName === 'Action') {
          // 遍历所有的子元素
          path.traverse({
            CallExpression(path) {
              const {
                node: { callee }
              } = path;
              if (t.isMemberExpression(callee)) {
                if (callee.property.name === 'setData') {
                  callee.property.name = 'setState';
                } else if (callee.property.name === '$spliceData') {
                  callee.property.name = 'spliceState';
                }
              }
            }
          });
        }
      }
    }
  };
};
