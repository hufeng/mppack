/**
 * 登录
 */
export const login = () => {
  return new Promise(resolve => {
    wx.login({
      success() {
        resolve(null);
      },
      fail() {
        resolve(new Error('login fail'));
      }
    });
  });
};

export const getUserInfo = () => {
  return new Promise(resolve => {
    wx.getUserInfo({
      success(res) {
        resolve({
          err: null,
          res
        });
      },
      fail() {
        resolve({
          err: new Error('get user info error'),
          res: null
        });
      }
    });
  });
};
