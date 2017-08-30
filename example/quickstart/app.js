import { login, getUserInfo } from './promisify';

//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
  async getUserInfo(cb) {
    if (this.globalData.userInfo) {
      return this.globalData.userInfo;
    }

    const loginErr = await login();
    if (loginErr) {
      //tip
      return;
    }

    const { res, err } = await getUserInfo();
    if (err) {
      //tip
      return;
    }

    this.globalData.userInfo = res.userInfo;
    return res.userInfo;
  }
});
