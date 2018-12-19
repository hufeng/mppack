import { IMueReducer, mpapp, TPath } from './types';

export const getPathVal = (data: Object, path: TPath) => {
  let result = data;
  if (Array.isArray(path)) {
    for (let p of path) {
      result = result[p];
      if (!result) {
        return undefined;
      }
    }
    return result;
  } else {
    return data[path];
  }
};

export const reduceDataLifeCycleMethod = (
  obj: mpapp.IPageProps = {},
  reducer: IMueReducer
) => {
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
    onPageScroll,
    onTitleClick,
    onResize,
    onTabItemTap,
    ...rest
  } = obj;

  reducer.data.push(data);
  reducer.onLoad.push(onLoad);
  reducer.onReady.push(onReady);
  reducer.onShow.push(onShow);
  reducer.onHide.push(onHide);
  reducer.onUnload.push(onUnload);
  reducer.onPullDownRefresh.push(onPullDownRefresh);
  reducer.onReachBottom.push(onReachBottom);
  reducer.onShareAppMessage.push(onShareAppMessage);
  reducer.onPageScroll.push(onPageScroll);
  reducer.onTitleClick.push(onTitleClick);
  reducer.onResize.push(onResize);
  reducer.onTabItemTap.push(onTabItemTap);

  return rest;
};
