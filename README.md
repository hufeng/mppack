# mppack

构建一个好用的小程序的打包工具，小程序界的 webpack 😆 😆 ^\_^

## why ?

各种(钉钉，微信，支付宝)小程序以燎原之势席卷而来之后，对于小程序的开发需求就提上了日程

小程序本身提供的开发方式非常简约，我们可以用更  现代前端的开发方式来构建我们的应用

1. <del>不支持 node_modules</del> 已经原生支持了
2. <del>不支持模块的绝对路径（导致了不支持 node_modules）</del>
3. 不完整的支持 es6 或者 更想用 typescript(效率工具)
4. Callback 回调方式如果逻辑重太难维护代码，更期待 promise/async/await 的解决方案
5. <del>组件的支持不够完整</del>

## Goal?

提供工程化的改进，而不是框架上的改进

1.<del> 自动支持 node_modules</del> 已经支持了

2. 无缝支持 babel（babel-preset-env） / typescript

3. 支持 async/await (babel-plugin-transform-runtime 并不能正常的在小程序中运行)

4. 自动编译

5. 样式支持 css，less 等

## getting started

install

```sh
# 全局安装
npm install -g mppack / yarn global add mppack

#项目依赖
yarn add mppack --dev
```

```sh
cd quick-start

mppack
```

```text
quick-start
 ❯ tree -L 3 -I node_modules
.
├── app.js
├── app.json
├── app.wxss
├── build // compile之后的结果
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── hello.jpg
│   ├── pages
│   │   ├── index
│   │   └── logs
│   ├── test.js
│   ├── utils
│   │   ├── index.js
│   │   └── util.js
│   └── vendor
│       ├── immutable
│       └── regenerator-runtime
├── hello.jpg
├── package.json
├── pages
│   ├── index
│   │   ├── index.js
│   │   ├── index.wxml
│   │   ├── index.wxss
│   │   └── test.js
│   └── logs
│       ├── logs.js
│       ├── logs.json
│       ├── logs.wxml
│       └── logs.wxss
├── test.ts
├── tsconfig.json
├── utils
│   ├── index.js
│   └── util.js
└── yarn.lock

12 directories, 25 files

```

## help

```text
~/OSS/mppack/example/eapp-hello next*
❯ mppack --help
Usage: mppack [-o path]

Options:
  -V, --version              output the version number
  -o, --output [path]        Which bundle output
  -v, --verbose              show verbose log
  -w, --watch                watch mode
  -c, --config [file]        specify a config file
  -t, --target [wxapp|eapp]  specify a platform target
  -h, --help                 output usage information


```

## For example

```text
~/OSS/mppack/example/eapp-hello next*
❯ mppack -w -v
 ____________________________
< 🚀🚀mppack@1.0.0开始为您构建 >
 ----------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
[15:12:47] 当前mppack版本 => 1.0.0
[15:12:47] 输出目录 => build
[15:12:47] watch模式 => true
[15:12:47] verbose模式 => true
[15:12:47] json: app.json => build/app.json
[15:12:47] less: app.less => build/app.acss
[15:12:47] ts: app.ts => build/app.js
[15:12:47] image: snapshot.png => build/snapshot.png
[15:12:47] axml: pages/index/index.axml => build/pages/index/index.axml
[15:12:47] json: package-lock.json => build/package-lock.json
[15:12:47] ts: pages/index/index.ts => build/pages/index/index.js
[15:12:47] js: node_modules/bmue/lib/index.js => build/node_modules/bmue/lib/index.js
[15:12:47] json: node_modules/bmue/package.json => build/node_modules/bmue/package.json
[15:12:47] ts: pages/index/ql.ts => build/pages/index/ql.js
[15:12:47] js: node_modules/bmue/lib/mixin.js => build/node_modules/bmue/lib/mixin.js
[15:12:47] json: pages/index/index.json => build/pages/index/index.json
[15:12:47] ts: pages/index/rl.ts => build/pages/index/rl.js
[15:12:47] js: node_modules/bmue/lib/mue.js => build/node_modules/bmue/lib/mue.js
[15:12:47] ts: pages/index/webapi.ts => build/pages/index/webapi.js
[15:12:47] js: node_modules/bmue/lib/types.js => build/node_modules/bmue/lib/types.js
[15:12:47] ts: node_modules/bmue/lib/typings/index.d.ts => build/node_modules/bmue/lib/typings/index.d.js
[15:12:47] js: node_modules/bmue/lib/util.js => build/node_modules/bmue/lib/util.js
[15:12:47] ts: node_modules/bmue/lib/typings/mixin.d.ts => build/node_modules/bmue/lib/typings/mixin.d.js
[15:12:47] js: node_modules/bmue/lib/rx/index.js => build/node_modules/bmue/lib/rx/index.js
[15:12:47] ts: node_modules/bmue/lib/typings/mue.d.ts => build/node_modules/bmue/lib/typings/mue.d.js
[15:12:47] js: node_modules/bmue/lib/rx/ql.js => build/node_modules/bmue/lib/rx/ql.js
[15:12:47] ts: node_modules/bmue/lib/typings/types.d.ts => build/node_modules/bmue/lib/typings/types.d.js
[15:12:47] js: node_modules/bmue/lib/rx/rl.js => build/node_modules/bmue/lib/rx/rl.js
[15:12:47] ts: node_modules/bmue/lib/typings/util.d.ts => build/node_modules/bmue/lib/typings/util.d.js
[15:12:47] ts: node_modules/bmue/lib/typings/rx/index.d.ts => build/node_modules/bmue/lib/typings/rx/index.d.js
[15:12:47] ts: node_modules/bmue/lib/typings/rx/ql.d.ts => build/node_modules/bmue/lib/typings/rx/ql.d.js
[15:12:47] ts: node_modules/bmue/lib/typings/rx/rl.d.ts => build/node_modules/bmue/lib/typings/rx/rl.d.js
[15:12:49] gulp-imagemin: Minified 1 image (saved 13.6 kB - 85.1%)
⛽️ finish |>: 2156.029ms
[15:12:49] watching...
```

通过配置文件来配置,默认读取本地的 mppack.config.js

可以通过-c 来指定文件的路径

```js
//wxpack.config.js
module.exports = {
  //不需要'./build', 默认相对当前的目录
  output: 'build',
  //是否开启watch模式
  watch: true/false，
  //开启或者关闭log详情
  verbose: true/false
}
```

# bmue

## Why?

小程序本身的 Api， 如果 Page，App 等已经够满足自身的开发，不需要特别重的开发框架或者模式

在基于这个基础上其实我们还可以做的更好一点，比如基于 Reactive 的设计可以做的更简单一点

小程序本身也是 Reactive 的设计当我们 setData 的时候，UI 会自动 re-render

其实数据的本身也是需要这种机制，遗憾小程序 UI 只能从 data 中获取数据，

导致不能像 vue 一样有 compute 属性，好处是我们可以简单的实现，当 data 发生变化的时候有数据
reactive 的计算的能力

如果所有逻辑都放在 Page 中会导致 Page 比较臃肿，代码难以重用，我们可以做一些公共功能的分拆如 Pagination 等，然后自动 mixin 到 Page 的参数对象中去

从这些点入手，我们可以设计一个简单的  粘合层去自动帮我们做到这些。
这就是 bmue 的初衷。

## getting started

```sh
yarn add bmue
```

## Simple demo

小程序 Page

```javascript
Page({
  data: {
    hello: 'hello mpapp'
  },
  onLoad() {
    this.setData({
      hello: 'hello mapp next'
    });
  }
});
```

bmue Mue

```javascript
import { Mue } from 'bmue';
Mue({
  data: {
    hello: 'hello mpapp'
  },
  onLoad() {
    this.setData({
      hello: 'hello mapp next'
    });
  }
});
```

Yes, 完全一样嘛！ O(∩_∩)O 哈哈~尴尬了嘛 No No No

## Domain Object

### Mixin

像早期的 React 的 api 一样，我们可以设计一个 mixin 的体系，来合入公共的功能

```javascript
const Hello = React.createClass({
  mixins: [StoreMixin],

  render() {
    //...
  }
});
```

mixin 就是一个普通的对象(pojo => plain Ordinary javasript object)

```typescript
import { Mixin, Mue } from 'bmue';

export const TabMixin = Mixin({
  //auto merge into Page data
  data: {
    tabs: {
      activeIndex: 0,
      data: [
        { title: '全部' },
        { title: '待处理' },
        { title: '已处理' },
        { title: '已完成' }
      ]
    }
  },

  setTabActive(index: number) {
    this.setData({
      'tabs.activeIndex': index
    });
  }
});

Mue({
  mixins: [TabMixin]
});
```

```typescript
export const PaginationMixin = (url: string) => {
  return Mixin({
    pageNo: 0,
    pageSize: 20,
    data: {
      pageList: []
    },

    //lifecycle method
    //auto merge into Page lifycle method
    onLoad() {
      this.refreshFetchData();
    },
    onPullDownRefresh() {
      this.refreshFetchData();
    },
    onReachBottom() {
      this.fetchData();
    }

    fetchData() {
      //url
      //params
    },
    refreshFetchData() {
      //url,
      //params
      this.pageNo = 0;
    }
  });
};

Mue({
  mixins: [Pagination('http://......')]
})
```

### QL = query-lang

我们想基于 Reactive 设计数据计算的能力单元，这就是我们的 QL

```javascript
const helloQL = QL('helloQL', [
  //data path
  //in order to compute data whether was changed.
  'hello',
  hello => `${hello}!!!`
]);

Mue({
  //when first loading, or data was changed
  //helloQL was computed auto, and value was
  //merged into data: {rx: {hello: 'hello mpapp!!'}}
  getter: { hello: helloQL },
  data: {
    hello: 'hello mpapp'
  },
  onLoad() {
    //setState can effect geteer
    //setData can not do it.
    this.setState({
      hello: 'hello mpapp next'
    });
  }
});
```

### EL = effect-lang

我们可以看到 QL 是关注返回值的，有些时候在一些场景我们不需要返回值，

比如 🔍 的时候，无论是搜索条件发生改变或者其他的影响到搜索的条件，

我们希望可以自动的做搜索 api 的调用，这就是 el

```javascript
const el = EL('helloEL', [
  //data path, may Array or string
  'searchParam',
  searchParam => {
    webapi.fetchResult(searchParam);
  }
]);

Mue({
  effect: [el],
  data: {
    searchParam: {
      key: ''
    }
  },

  onSearchTap(key) {
    this.setState({
      'searchParam.key': key
    });
    //el was auto call
  }
});
```

### Mue = Page + Reactive

Mue 对象根据传入的参数进行数据的处理然后调用 Page

```javascript
Mue({
  //reactive data
  //当setState数据发生变化的时候
  //Mue会自动计算ql，如果数据发生了变化(自带缓存机制)
  //会自动把变化的数据绑定到data: {rx: {}} rx内
  //页面(wxml, axml)可以{{rx.hello}}这样获取
  getter: {},

  //reactive effect
  //当setState数据发生变化，Mue自动判断数据的变化会不会影响到EL
  //如果影响会自动的调用EL的函数
  effect: [],

  //Mue, 会自动的解析Mixin
  //将Mixin中的所有的data和声明周期方法合并
  //然后合入最终的Page需要的对象参数中去
  mixins: [],

  //当前页面的state,
  //Mue会自动合入mixin中的所有的data，已经QL计算的结果
  data: {},

  //声明周期函数
  //Mue会自动把mixin中的声明周期函数自动合并
  onLoad() {},

  //普通方法，
  onButtonTap() {
    //自动触发getter，effect的计算
    //setData,没有办法做到
    this.setState({
      //
    })
  }
});
```
