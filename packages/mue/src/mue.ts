import Reactive from './rx';
import { mpapp } from './types';

declare function Page(obj: Object): Object;

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
      pageObj[lifecycle] = arg => list.forEach(v => v(arg));
    }
  });

  return Page({
    ...pageObj,
    ...new Reactive({
      dev,
      data: mergeData,
      getter,
      effect
    })
  });
}
