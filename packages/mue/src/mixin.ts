/**
 * 小程序中我们的数据和操作都会放在Page中，
 * 如果逻辑稍微复杂就会Page爆炸,我们需要一些
 * 基础的代码的重用能力，最简单的办法就是设计一个
 * mixin机制，这样对于分页或者某个tab的设计就变成
 * 了一个单独的mixin片段，有自己的数据和操作，我们合入
 * 一起就会变成一个强大的Page对象
 *
 *
 * const PaginationMixin = {
 *   //会从mixin到page的合并
 *   {data: {pageList: []}}, //data: 会自动合入最终的Page的data里面去，普通的属性不会(不需要reactive的能力或者页面不需要)
 *
 *   //lifecycle method, 会从mixin到page做合并
 *   onLoad() {},
 *   onPullRefresh() {
 *   },
 *   onEndReached() {},
 *
 *   // 分页方法，会直接合入page内部，注意重名
 *   onFetchPagination() {
 *    // request data
 *    // set data
 *   }
 *   onRefreshPagination(){}
 * }
 *
 *
 * How to use?
 *
 * Mue({
 *  mixins: [PaginationMixin, TabbarMixin, ...]
 * })
 *
 *
 */

export default function mixins(page) {
  const { mixins = [], data: pageData, ...pageRest } = page;
  const mergeMixins = mixins.reduce((pre, cur) => {
    const { data: preData = {}, ...preRest } = pre;
    const { data: curData = {}, ...curRest } = cur;
    return {
      data: {
        ...preData,
        ...curData
      },
      ...preRest,
      ...curRest
    };
  }, {});
  const { data: mergeMixinData, ...mergeMixinsRest } = mergeMixins;
  const pageObj = {
    data: {
      ...mergeMixinData,
      ...page.data
    },
    ...mergeMixinsRest,
    ...pageRest
  };
  return pageObj;
}
