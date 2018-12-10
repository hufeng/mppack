declare function App(params: Object): void;

App({
  //@ts-ignore
  onLaunch(options) {
    // 第一次打开;
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  //@ts-ignore
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  }
});
