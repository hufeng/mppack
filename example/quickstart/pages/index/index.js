//index.js
//获取应用实例
var app = getApp();

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
  async onLoad() {
    //调用应用实例的方法获取全局数据
    const userInfo = await app.getUserInfo();
    this.setData({
      userInfo
    });
  }
});
