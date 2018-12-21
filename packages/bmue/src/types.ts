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

export interface IDDJSAPI {
  /**
   * 向指定服务器发起一个跨域 http(s) 请求。
   */
  httpRequest(param: {
    /**
     * 目标服务器url
     */
    url: string;
    /**
     * 设置请求的 HTTP 头，默认 {'Content-Type': 'application/x-www-form-urlencoded'}
     */
    headers?: Object;
    /**
     * 默认GET，目前支持GET，POST
     */
    method?: string;
    /**
     * 请求参数
     */
    data?: Object;
    /**
     * 超时时间，单位ms，默认30000
     */
    timeout?: number;
    /**
     * 期望返回的数据格式，默认json，支持json，text，base64
     */
    dataType?: string;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: { data: string; status: number; headers: Object }) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 上传本地资源到开发者服务器
   */
  uploadFile(param: {
    /**
     * 开发者服务器地址
     */
    url: string;
    /**
     * 要上传文件资源的本地定位符
     */
    filePath?: string;
    /**
     * 文件名，即对应的 key, 开发者在服务器端通过这个 key 可以获取到文件二进制内容
     */
    fileName?: string;
    /**
     * 文件类型，image / video / audio
     */
    fileType?: string;
    /**
     * HTTP 请求 Header
     */
    header?: Object;
    /**
     * HTTP 请求中其他额外的 form 数据
     */
    formData?: Object;
    /**
     * 调用成功的回调函数
     */
    success?: (
      resp: { data: string; statusCode: string; headers: Object }
    ) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 创建一个 WebSocket 的连接；
   * 一个钉钉E应用同时只能保留一个 WebSocket 连接，
   * 如果当前已存在 WebSocket 连接，会自动关闭该连接，
   * 并重新创建一个新的 WebSocket 连接。
   */
  connectSocket(param: {
    /**
     * 目标服务器url
     */
    url: string;
    /**
     * 请求的参数
     */
    data?: Object;
    /**
     * 设置请求的头部
     */
    header?: Object;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 监听WebSocket连接打开事件。
   */
  onSocketOpen(res: any): void;

  /**
   * 取消监听WebSocket连接打开事件。
   */
  offSocketOpen(cb: Function): void;

  /**
   * 监听WebSocket错误。
   */
  onSocketError(res: any): void;

  /**
   * 通过 WebSocket 连接发送数据，
   * 需要先使用 dd.connectSocket 发起建连，
   * 并在 dd.onSocketsOpen 回调之后再发送数据。
   */
  sendSocketMessage(param: {
    /**
     * 需要发送的内容：普通的文本内容 String 或者经 base64 编码后的 String
     */
    data: string | ArrayBuffer;
    /**
     * 如果需要发送二进制数据，
     * 需要将入参数据经 base64 编码成 String 后赋值 data，
     * 同时将此字段设置为true，
     * 否则如果是普通的文本内容 String，不需要设置此字段
     */
    isBuffer?: boolean;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 监听WebSocket接受到服务器的消息事件。
   */
  onSocketMessage(res: { data: string | ArrayBuffer; isBuffer: boolean }): void;

  /**
   * 取消监听WebSocket接受到服务器的消息事件。
   */
  offSocketMessage(): void;

  closeSocket(param: {
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 监听WebSocket关闭。
   */
  onSocketClose(param: Function): void;
  /**
   * 取消监听WebSocket关闭。
   **/
  offSocketClose(): void;

  chooseImage(param: {
    /**
     * 最大可选照片数，默认1张
     */
    count?: number;
    /**
     * 相册选取或者拍照，默认 ['camera','album']
     */
    sourceType?: Array<string>;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 预览图片。
   */
  previewImage(params: {
    /**
     * 要预览的图片链接列表
     */
    urls: Array<string>;
    /**
     * 当前显示图片索引，默认 0
     */
    current?: number;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 保存在线、本地临时或者永久地址图片到手机相册。
   */
  saveImage(param: {
    /**
     * 要保存的图片地址
     */
    url: string;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 压缩图片
   */
  compressImage(param: {
    /**
     * 要压缩的图片地址数组
     */
    filePaths: Array<string>;
    /**
     * 压缩级别，支持 0 ~ 4 的整数，默认 4。详见「compressLevel表」
     */
    compressLevel?: number;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  getImageInfo(param: {
    /**
     * 图片路径，目前支持：
     * 网络图片路径
     * filePath路径
     * 相对路径
     */
    src?: string;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: { width: number; height: number; path: string }) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 背景音频管理器
   * 获取当前E应用全局唯一的背景音频管理 backgroundAudioManager。当E应用切入后台时，音频可以背景播放。
   */
  getBackgroundAudioManager(): {
    /**
     * 音频文件地址，支持类型有mp3/wav/aac/m4a格式。当设置此值时，音频就会开始播放
     * 读/写
     */
    src: string;
    /**
     * 音频标题
     * 读/写
     */
    title: string;
    /**
     * 引用播放封面图片地址
     * 读/写
     */
    coverImgUrl: string;
    /**
     * 音频是否暂停
     * 读
     */
    paused: boolean;
    /**
     * 当前音频的总长度，单位是秒
     * 读
     */
    duration: number;
    /**
     * 当前音频播放的位置，单位是秒
     * 读
     */
    currentTime: number;
    /**
     * 播放
     */
    play(): void;
    /**
     * 暂停
     */
    pause(): void;
    /**
     * 停止
     */
    stop(): void;
    /**
     * 跳转到制定位置position，以秒为单位
     */
    seek(position: number): void;
    /**
     * 监听背景音频播放事件
     */
    onPlay(): void;
    /**
     * 监听背景音频暂停事件
     */
    onPause(): void;
    /**
     * 监听背景音频停止事件
     */
    onStop(): void;
    /**
     * 监听背景音频结束事件
     */
    onEnded(): void;
    /**
     * 监听背景音频播放进度更新事件
     */
    onTimeUpdate(): void;
    /**
     * 监听背景音频错误事件, 错误类型（10001：系统错误，10002：网络错误，10003：文件错误，10004：格式错误）
     */
    onError(): void;
    /**
     * 监听背景音频加载中事件
     */
    onWaiting(): void;
  };

  chooseVideo(param: {
    /**
     * 视频来源
     * 默认：['album', 'camera']
     */
    sourceType?: Array<string>;
    /**
     * 最长视频拍摄事件，单位为秒
     * 默认:60
     */
    maxDuration?: string;
    /**
     * 调用成功的回调函数
     */
    success?: (
      resp: {
        apFilePath: string;
        duration: number;
        size: number;
        height: number;
        width: number;
      }
    ) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 获取E应用免登授权码
   * 使用说明
   * ISV应用和个人应用的免登授权码均可通过该JSAPI获取。 在获取免登授权码（authCode)后，可以调用服务端接口，拿到用户信息。使用方式如下：
   *（1）第三方个人E应用参考：身份验证
   *（2）第三方企业E应用参考：身份验证
   *（3）企业内部开发E应用参考：用户免登
   */
  getAuthCode(param: {
    /**
     * 调用成功
     */
    success(res: { authCode: string }): void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
  }): void;

  navigateTo(param: {
    /**
     * 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。
     * 参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，
     * 不同参数必须用&分隔；如 path?key1=value1&key2=value2
     */
    url: string;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  redirectTo(param: {
    /**
     * 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。
     * 参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，
     * 不同参数必须用&分隔；如path?key1=value1&key2=value2
     */
    url: string;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  navigateBack(): void;

  /**
   * 关闭当前所有页面，跳转到应用内的某个指定页面。
   */
  reLaunch(param: {
    /**
     * 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。
     * 参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，
     * 不同参数必须用&分隔；如path?key1=value1&key2=value2
     */
    url: string;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  setNavigationBar(param: {
    /**
     * 导航栏标题
     */
    title?: string;
    /**
     * 导航栏背景色，支持十六进制颜色值
     */
    backgroundColor?: string;
    /**
     * 是否重置导航栏为钉钉默认配色，默认 false
     */
    reset?: boolean;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  switchTab(param: {
    /**
     * 跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面）。注意：路径后不能带参数
     */
    url: string;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  alert(param: {
    /**
     * alert框的标题
     */
    title: string;
    /**
     * alert框的内容
     */
    content: string;
    /**
     * 按钮文字
     */
    buttonText?: string;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  confirm(param: {
    /**
     * 标题
     */
    title?: string;
    /**
     * 内容
     */
    content?: string;
    /**
     * 确认按钮文字
     */
    confirmButtonText?: string;
    /**
     * 取消按钮文字
     */
    cancelButtonText?: string;
    /**
     * 调用成功的回调函数
     * 点击 confirm 返回 true，点击 cancel 返回false
     */
    success?: (resp: { confirm: boolean }) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  /**
   * 显示一个弱提示，可选择多少秒之后消失。
   */
  showToast(param: {
    /**
     * 文字内容
     */
    content?: string;
    /**
     * toast 类型，展示相应图标，默认 none，支持 success / fail / exception / none。其中 exception 类型必须传文字信息
     */
    type?: string;
    /**
     * 显示时长，单位为 ms，默认 2000。按系统规范，android只有两种(<=2s >2s)
     */
    duration?: string;

    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  hideToast(): void;

  showLoading(param: {
    /**
     * loading的文字内容
     */
    content?: string;
    /**
     * 延迟显示，单位 ms，默认 0。如果在此时间之前调用了 dd.hideLoading 则不会显示
     */
    delay?: number;
    /**
     * 调用成功的回调函数
     */
    success?: (resp: any) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  hideLoading(): void;

  showActionSheet(parma: {
    /**
     * 菜单标题
     */
    title?: string;
    /**
     * 菜单按钮文字数组
     */
    items: Array<string>;
    /**
     * 取消按钮文案。注：Android平台此字段无效，不会显示取消按钮
     */
    cancelButtonText?: string;
    /**
     * （iOS特殊处理）指定按钮的索引号，从0开始，使用场景：需要删除或清除数据等类似场景，默认红色
     */
    destructiveBtnIndex: number;
    /**
     * 调用成功的回调函数
     * 被点击的按钮的索引，从0开始。点击取消或蒙层时返回 -1
     */
    success?: (resp: { index: number }) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  datePicker(parma: {
    /**
     * 返回的日期格式，
     * yyyy-MM-dd（默认）
     *  HH:mm
     *  yyyy-MM-dd HH:mm
     *  yyyy-MM
     */
    format?: string;
    /**
     * 初始选择的日期时间，默认当前时间
     */
    currentDate?: string;
    /**
     * 调用成功的回调函数
     *  选择的日期
     */
    success?: (resp: { data: string }) => void;
    /**
     * 调用失败的回调函数
     */
    fail?: (res: any) => void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (res: any) => void;
  }): void;

  createAnimation(param: {
    /**
     * 动画的持续时间，单位 ms，默认值 400
     */
    duration?: number;
    /**
     * 定义动画的效果，默认值"linear"，有效值："linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
     */
    timingFunction?: string;
    /**
     * 动画延迟时间，单位 ms，默认值 0
     */
    delay?: number;
    /**
     * 设置transform-origin，默认值 "50"
     */
    transformOrigin?: string;
  }): {
    rotate(deg: number): void;
  };
}

export interface IWxJSAPI {}

declare global {
  function App(props: mpapp.IAppProps): void;
  function Page(prop: mpapp.IPageProps): void;
  function getApp(): mpapp.IAppProps;
  function Component<P, S>(
    prop: mpapp.IEAppComponentProps<P, S> | mpapp.IWxAppComponentProps
  ): void;

  const dd: IDDJSAPI;
  const wx: IWxJSAPI;
}
