const babel = require('babel-core');
const pack = require('../index');

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
});

Action({
  sayHello() {
    this.setData({});
    this.$spliceData({})
  }
})
`;

it('test setData and spliceData', () => {
  const { code } = babel.transform(testCode, {
    plugins: [pack]
  });
  expect(code).toMatchSnapshot();
});

it('test async/await', () => {
  const sourceCode = `
  var _onLoad = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this = this;

      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              app.getUserInfo(function (userInfo) {
                _this.setState({
                  userInfo: userInfo
                });
              });
              console.log('onLoading...');
              _context.next = 4;
              return webapi.fetchData();

            case 4:
              data = _context.sent;
              this.setState({
                todo: data
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    var _onLoad1 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                app.getUserInfo(function (userInfo) {
                  _this.setState({
                    userInfo: userInfo
                  });
                });
                console.log('onLoading...');
                _context.next = 4;
                return webapi.fetchData();

              case 4:
                data = _context.sent;
                this.setState({
                  todo: data
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
  `;

  const { code } = babel.transform(sourceCode, {
    plugins: [pack]
  });

  expect(code).toMatchSnapshot();
});
