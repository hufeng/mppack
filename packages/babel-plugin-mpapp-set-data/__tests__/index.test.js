const babel = require('babel-core');
const setData = require('../index');

const testCode = `
//test mixin
const TabMixin = Mixin({
  data: {
    tabIndex: 0
  },

  onHandleTabIndex(tabIndex) {
   this.setData({
     tabIndex
   });
   this.$spliceData({})
  }
});

//test plain javascript object
const pojo = {
  data: {
    test: 0
  },

  sayHello() {
    this.setData({})
    this.$spliceData({})
  }
};

//test mue object
Mue({
  data: {
    list: []
  },

  sayHello() {
    this.setData({});
    this.$spliceData({})
  }
})
`;

it('test setData and spliceData', () => {
  const { code } = babel.transform(testCode, {
    plugins: [setData]
  });
  expect(code).toMatchSnapshot();
});
