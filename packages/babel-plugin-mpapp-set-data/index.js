module.exports = function(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      CallExpression(path) {
        //get callee
        const {
          node: { callee }
        } = path;
        //this.setData() => this.setState()
        //this.$spliceData() => this.spliceState()
        if (t.isMemberExpression(path.node.callee)) {
          if (callee.property.name === 'setData') {
            callee.property.name = 'setState';
          } else if (callee.property.name === '$spliceData') {
            callee.property.name = 'spliceState';
          }
        }
      }
    }
  };
};
