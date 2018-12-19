import clonedeep from 'lodash.clonedeep';
import Rx from './rx';
import { mpapp } from './types';
import { reduceDataLifeCycleMethod } from './util';

/**
 * A simple factory function, let mini app development more compose and reactive
 * page object includes:
 * 1. data => wxml/axml need data
 * 2. mixins: {data, method, lifycycle, ...other} => compose unit
 * 3. lifycycle mehtod => onLoad, onReady...
 * 4. method => event handler
 * 5. getter => ql(reactive data)
 * 6. effect => rl (reactive side effect)
 * 7. action => response page
 */

export default function Mue(page: mpapp.IPageProps) {
  //collection data and all lifecycle method
  const reducer = {
    data: [],
    onLoad: [],
    onReady: [],
    onShow: [],
    onHide: [],
    onUnload: [],
    onPullDownRefresh: [],
    onReachBottom: [],
    onShareAppMessage: [],
    onPageScroll: [],
    onTitleClick: [],
    onResize: [],
    onTabItemTap: []
  };

  const { dev = false, mixins = [], getter, effect, action, ...rest } = page;

  if (dev) {
    console.log('=================🚀bmue bootstrap🚀=================');
  }

  //merge reactive object
  let pageObj = {};
  //reduce mixin
  for (let mixin of mixins) {
    const mixinRest = reduceDataLifeCycleMethod(mixin, reducer);
    pageObj = {
      ...pageObj,
      ...mixinRest
    };
  }
  //reduce action
  const actionRest = reduceDataLifeCycleMethod(action, reducer);
  //reduce page
  const pageRest = reduceDataLifeCycleMethod(rest, reducer);
  //reduce lifecycle
  [
    'onLoad',
    'onReady',
    'onShow',
    'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onShareAppMessage',
    'onPageScroll',
    'onTitleClick',
    'onResize',
    'onTabItemTap'
  ].forEach(lifecycle => {
    const list = reducer[lifecycle].filter((method: Function) => method);
    if (list.length > 0) {
      pageObj[lifecycle] = function(arg: any) {
        list.forEach((v: Function) => v.call(this, arg));
      };
    }
  });
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

  const rx = new Rx({
    dev,
    data: mergeData,
    getter,
    effect
  });

  pageObj = {
    ...rx,
    ...pageObj,
    ...actionRest,
    ...pageRest
  };

  pageObj['setState'] = function(arg: Object, cb: Function) {
    if (dev) {
      console.groupCollapsed('================setState===================');
      console.log('param:', arg);
    }
    //@ts-ignore
    this.setData(arg, () => {
      if (dev) {
        // @ts-ignore
        console.log(this.data);
      }

      //@ts-ignore
      const data = clonedeep(this.data);
      //computed ql
      // @ts-ignore
      const rx = this.computeQL(data);
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
      this.effect.forEach((effect: Function) => {
        //@ts-ignore
        effect.apply(this, [data, this]);
      });

      if (dev) {
        console.groupEnd();
      }
    });
  };

  pageObj['spliceState'] = function(arg: Object) {
    if (dev) {
      console.groupCollapsed('================spliceState===================');
      console.log('param:', arg);
    }
    //@ts-ignore
    this.$spliceData(arg, () => {
      //@ts-ignore
      const data = clonedeep(this.data);
      //computed ql
      // @ts-ignore
      const rx = this.computeQL(data);

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
      this.effect.forEach((effect: Function) => {
        //@ts-ignore
        // effect(this.data);
        effect.apply(this, [data, this]);
      });

      if (dev) {
        console.groupEnd();
      }
    });
  };

  return Page(pageObj);
}
