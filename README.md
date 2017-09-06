# wxpacker
构建一个好用的小程序的打包工具，小程序界的webpack

why ?

微信小程序火了之后，对于小程序的开发需要就提上了日程，

小程序本身提供的开发方式很简约，但是还有很多地方不符合现代前端的开发方式

1. 不支持node_modules
2. 不支持模块的绝对路径
3. 不完整的支持es6 或者 更想用typescript
4. Callback回调方式如果逻辑重太难维护代码，更期待promise/async/await的解决方案
5. 组件的支持不够完整


Goal?

提供完整的前端开发体验

1. 自动支持node_modules 通过babel的ast的分析转换自动的将require('immutable') => require('../vendor/immutable/dist/immutable') 自动目录拷贝

2. 无缝支持babel（babel-preset-env + async/await）/typescript

4. 支持async/await

5. 自动编译


how ?

```sh
npm install -g wxpack # 全局安装
yarn add wxpack --dev #项目依赖
```

```sh
cd quick-start
wxpack
```

```text
quick-start
 ❯ tree -L 3 -I node_modules
.
├── app.js
├── app.json
├── app.wxss
├── build
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
❯ wxpack --help

  Usage: wxpack [-o path]


  Options:

    -V, --version        output the version number
    -o, --output [path]  Which bundle output
    -v, --verbose        show verbose log
    -w, --watch          watch mode
    -c, --config [file]  specify a config file
    -h, --help           output usage information
                                              
```

通过配置文件来配置,默认读取本地的wxpack.config.js

可以通过-c来指定文件的路径

```js
//wxpack.config.js
module.exports = {
  //不需要'./build', 默认相对当前的目录
  output: 'build',
  //是否开启watch模式
  watchMode: true/false，
  //开启或者关闭log详情
  verbose: true/false
}
```


