import { ELang } from './rx/el';
import { QueryLang } from './rx/ql';

export type TQueryLangHandler = (...arg: Array<any>) => any;
export type TQueryLang = Array<TPath | TQueryLangHandler | QueryLang>;
export type TRxLangHandler = (...args: Array<any>) => void;
export type TRxLang = Array<TPath | TRxLangHandler>;
export type TPath = Array<string | number> | string;

export interface IRxParams {
  dev?: boolean;
  data?: Object;
  getter?: {
    [name: string]: QueryLang;
  };
  effect?: Array<ELang>;
}

export interface IMueReducer {
  data: Array<Object>;
  onLoad: Array<Function>;
  onReady: Array<Function>;
  onShow: Array<Function>;
  onHide: Array<Function>;
  onUnload: Array<Function>;
  onPullDownRefresh: Array<Function>;
  onReachBottom: Array<Function>;
  onShareAppMessage: Array<Function>;
  onPageScroll: Array<Function>;
  onTitleClick: Array<Function>;
  onResize: Array<Function>;
  onTabItemTap: Array<Function>;
}

export namespace mpapp {
  export interface IReferrerInfo {
    /**
     * 来源小程序、公众号或 App 的 appId
     */
    appId: string;
    /**
     * 来源小程序传过来的数据，scene=1037 或 1038 时支持
     */
    extraData: Object;
  }

  export interface IAppLaunchParam {
    /**
     * 启动小程序的 query 参数
     */
    query: Object;
    /**
     * 启动小程序的路径
     */
    path: string;

    /**
     * 微信小程序的启动的场景值
     */
    scene?: number;

    /**
     *微信小程序更多的转发信息
     */
    shareTicket?: string;

    /**
     * 微信小程序
     * 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     */
    referrerInfo?: Object;
  }

  export interface ITabItemTapObject {
    /**
     * 被点击 tabItem 的序号，从 0 开始
     * @since 1.9.0
     */
    index: string;
    /**
     * 被点击 tabItem 的页面路径
     * @since 1.9.0
     */
    pagePath: string;
    /**
     * 被点击 tabItem 的按钮文字
     * @since 1.9.0
     */
    text: string;
  }

  export interface IAppProps {
    /**
     * 生命周期回调—监听小程序初始化
     * 小程序初始化完成时（全局只触发一次）
     */
    onLaunch?: (options: IAppLaunchParam) => void;

    /**
     * 生命周期回调—监听小程序显示
     * 小程序启动，或从后台进入前台显示时
     */
    onShow?: (options: IAppLaunchParam) => void;

    /**
     * 生命周期回调—监听小程序隐藏
     * 小程序从前台进入后台时
     */
    onHide?: () => void;
    /**
     * 错误监听函数
     * 小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息
     */
    onError?: (msg: string) => void;

    /**
     * 微信小程序特有方法
     * 页面不存在监听函数
     * 小程序要打开的页面不存在时触发，会带上页面信息回调该函数
     */
    onPageNotFound?: () => void;

    globalData?: any;
    [key: string]: any;
  }

  export interface IPageProps {
    /**
     * 微信Object
     * 钉钉eapp可以是object和Function
     */
    data?: Object | Function;
    /**
     * 点击标题触发
     * 钉钉小程序特有
     */
    onTitleClick?: () => void;
    /**
     * 页面滚动触发事件的处理函数
     */
    onPageScroll?: (scroll: { scrollTop: number }) => void;
    /**
     * 生命周期回调—监听页面加载
     */
    onLoad?: (query: Object) => void;
    /**
     * 生命周期回调—监听页面初次渲染完成
     */
    onReady?: () => void;
    onShow?: () => void;
    /**
     * 生命周期回调—监听页面隐藏
     */
    onHide?: () => void;
    /**
     * 生命周期回调—监听页面卸载
     */
    onUnload?: () => void;
    /**
     * 监听用户下拉动作
     */
    onPullDownRefresh?: () => void;
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom?: () => void;
    /**
     * 用户点击右上角转发
     */
    onShareAppMessage?: () => void;

    /**
     * 页面尺寸改变时触发
     * 微信小程序特有
     */
    onResize?: () => void;

    /**
     * 当前是 tab 页时，点击 tab 时触发
     * 微信小程序特有
     * @platform wxapp
     */
    onTabItemTap?: (item: ITabItemTapObject) => void;

    setData?: (data: Object, callback?: () => void) => void;

    /**
     * @platform eapp
     */
    $spliceData?: (
      start: number,
      deleteCount: number,
      ...items: Array<any>
    ) => void;

    setState?: (data: Object, callback?: () => void) => void;

    /**
     * @platform eapp
     */
    spliceState?: (
      start: number,
      deleteCount: number,
      ...items: Array<any>
    ) => void;

    /**
     * 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，
     * 第一个元素为首页，最后一个元素为当前页面。
     *
     * @platform eapp
     */
    getCurrentPages?: () => Array<string>;
    [key: string]: any;
  }

  export interface IComponentMixin {
    data?: any;
    props?: any;
    didUpdate?: (prevProps: any, prevData: any) => void;
    didMount?: () => void;
    didUnmount?: () => void;
    methods?: { [key: string]: Function };
  }

  export interface IEAppComponentProps<P = any, S = any> {
    mixins?: Array<IComponentMixin>;
    data?: S;
    props?: P;
    didUpdate?: (prevProps: P, prevData: S) => void;
    didMount?: () => void;
    didUnmount?: () => void;
    methods?: { [key: string]: (param: any) => void };
    is?: string;
    $page?: Object;
    $id?: number;
  }

  export interface IWxAppComponentProps {
    properties?: Object;
    data?: Object;
    methods?: Object;
    behaviors?: Array<string>;
    created?: Function;
    attached?: Function;
    ready?: Function;
    moved?: Function;
    detached?: Function;
    relations?: Function;
    externalClasses?: Array<string>;
    options?: Object;
    lifetimes?: Object;
    pageLifetimes?: Object;
    definitionFilter?: Function;
  }
}

declare global {
  function App(props: mpapp.IAppProps): void;
  function Page(prop: mpapp.IPageProps): void;
  function getApp(): mpapp.IAppProps;
  function Component<P, S>(
    prop: mpapp.IEAppComponentProps<P, S> | mpapp.IWxAppComponentProps
  ): void;
}
