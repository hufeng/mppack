//index.js
import { QL, RxPage } from '../../rxsource/index';

//获取应用实例
var app = getApp();

const helloQL = QL('helloQL', state => state.motto + 'hhh');

RxPage({
  data: {
    motto: 'hello world'
  },
  onLoad() {
    this.hello();
  },
  hello() {
    console.log(this);
    this.setData({ motto: 'hello 2' });
  }
});
