import Rx from './rx';
import { mpapp } from './types';

/**
 * A simple factory function, let mini app development more compose and reactive
 * page object includes:
 * 1. data => wxml/axml need data
 * 2. mixins: {data, method, lifycycle, ...other} => compose unit
 * 3. lifycycle mehtod => onLoad, onReady...
 * 4. method => event handler
 * 5. getter => ql(reactive data)
 * 6. effect => rl (reactive side effect)
 */

export default function Mue(page: mpapp.IPageProps) {
  //destruct page
  const {
    dev = false,
    data = {},
    mixins = [],
    getter = {},
    effect = [],
    onLoad,
    onReady,
    onShow,
    onHide,
    onUnload,
    onPullDownRefresh,
    onReachBottom,
    onShareAppMessage,
    ...others
  } = page;

  if (dev) {
    console.log('=================🚀bmue bootstrap🚀=================');
  }

  /**
   * collect all mixin page data, and lifycycle method
   * in order to merge all
   */
  const reducer = {
    data: [],
    onLoad: [],
    onReady: [],
    onShow: [],
    onHide: [],
    onUnload: [],
    onPullDownRefresh: [],
    onReachBottom: [],
    onShareAppMessage: []
  };

  //merge reactive object
  let pageObj = {};

  //reduce mixin
  for (let mixin of mixins) {
    const {
      data = {},
      onLoad,
      onReady,
      onShow,
      onHide,
      onUnload,
      onPullDownRefresh,
      onReachBottom,
      onShareAppMessage,
      ...rest
    } = mixin;

    //collect page
    reducer.data.push(data);
    reducer.onLoad.push(onLoad);
    reducer.onReady.push(onReady);
    reducer.onShow.push(onShow);
    reducer.onHide.push(onHide);
    reducer.onUnload.push(onUnload);
    reducer.onPullDownRefresh.push(onPullDownRefresh);
    reducer.onReachBottom.push(onReachBottom);
    reducer.onShareAppMessage.push(onShareAppMessage);

    pageObj = {
      ...pageObj,
      ...rest
    };
  }

  //reduce page object
  reducer.data.push(data);
  reducer.onLoad.push(onLoad);
  reducer.onReady.push(onReady);
  reducer.onShow.push(onShow);
  reducer.onHide.push(onHide);
  reducer.onUnload.push(onUnload);
  reducer.onPullDownRefresh.push(onPullDownRefresh);
  reducer.onReachBottom.push(onReachBottom);
  reducer.onShareAppMessage.push(onShareAppMessage);

  pageObj = {
    ...pageObj,
    ...others
  };

  //reduce data
  const mergeData =
    reducer.data
      .filter(data => data)
      .reduce(
        (pre, cur) => ({
          ...pre,
          ...cur
        }),
        { rx: {} }
      ) || {};

  //reduce lifecycle
  [
    'onLoad',
    'onReady',
    'onShow',
    'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onShareAppMessage'
  ].forEach(lifecycle => {
    const list = (reducer[lifecycle] as Array<Function>).filter(
      method => method
    );
    if (list.length > 0) {
      pageObj[lifecycle] = function(arg) {
        list.forEach(v => v.call(this, arg));
      };
    }
  });

  const rx = new Rx({
    dev,
    data: mergeData,
    getter,
    effect
  });

  pageObj = {
    ...rx,
    ...pageObj
  };

  pageObj['setState'] = function(arg) {
    if (dev) {
      console.groupCollapsed('================setState===================');
      console.log('param:', arg);
    }
    //@ts-ignore
    this.setData(arg, () => {
      //computed ql
      // @ts-ignore
      const rx = this.computeQL(this.data);

      if (dev) {
        console.log('rx:', rx);
      }

      //@ts-ignore
      this.setData({
        rx: {
          //@ts-ignore
          ...this.data.rx,
          ...rx
        }
      });

      //compute effect
      //@ts-ignore
      this.effect.forEach(effect => {
        //@ts-ignore
        // effect(this.data);
        effect.apply(this, [this.data]);
      });

      if (dev) {
        console.groupEnd();
      }
    });
  };

  pageObj['spliceState'] = function(arg) {
    if (dev) {
      console.groupCollapsed('================spliceState===================');
      console.log('param:', arg);
    }
    //@ts-ignore
    this.$spliceData(arg, () => {
      //computed ql
      // @ts-ignore
      const rx = this.computeQL(this.data);

      if (dev) {
        console.log('rx:', rx);
      }

      //@ts-ignore
      this.setData({
        rx: {
          //@ts-ignore
          ...this.data.rx,
          ...rx
        }
      });

      //compute effect
      //@ts-ignore
      this.effect.forEach(effect => {
        //@ts-ignore
        // effect(this.data);
        effect.apply(this, [this.data]);
      });

      if (dev) {
        console.groupEnd();
      }
    });
  };

  return Page(pageObj);
}
