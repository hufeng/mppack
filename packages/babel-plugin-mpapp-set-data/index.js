module.exports = function(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      CallExpression(path) {
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
