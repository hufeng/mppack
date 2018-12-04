# mppack

构建一个好用的小程序的打包工具，小程序界的 webpack

## why ?

各种(钉钉，微信，支付宝)小程序(Cloud Native App)以燎原之势席卷而来之后，对于小程序的开发需求就提上了日程

小程序本身提供的开发方式简约却封闭，还有很多地方不符合现代前端的开发方式

1. <del>不支持 node_modules</del>
2. <del>不支持模块的绝对路径（导致了不支持 node_modules）</del>
3. 不完整的支持 es6 或者 更想用 typescript(效率工具)
4. Callback 回调方式如果逻辑重太难维护代码，更期待 promise/async/await 的解决方案
5. 组件的支持不够完整（很期待 wxs）

## Goal?

提供工程化的改进，而不是框架上的改进

1.<del> 自动支持 node_modules</del>

2. 无缝支持 babel（babel-preset-env） / typescript

3. 支持 async/await (babel-plugin-transform-runtime 并不能正常的在小程序中运行)

4. 自动编译

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
❯ mppack --help

  Usage: wxpack [-o path]


  Options:

    -V, --version        output the version number
    -o, --output [path]  Which bundle output
    -v, --verbose        show verbose log
    -w, --watch          watch mode
    -c, --config [file]  specify a config file
    -h, --help           output usage information

```

通过配置文件来配置,默认读取本地的 mppack.config.js

可以通过-c 来指定文件的路径

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
