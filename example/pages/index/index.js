//index.js
//获取应用实例
import foo from 'fofo';
import { fromJS } from 'immutable';
import * as plume2 from 'plume2';
var app = getApp();
var test = require('./test');
console.log(test);

// fromJS({
//   hello: 'hello'
// });

class User {
  static defaultProps = {
    name: 'hello'
  };
  getName() {
    console.log('name');
  }
}

Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad() {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
  }
});
