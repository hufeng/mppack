# wxpacker
微信小程序的webpacker


构建一个好用的小程序的打包工具，小程序界的webpack

why ?

微信小程序火了之后，对于小程序的开发需要就提上了日程，小程序本身提供的开发方式很简单，但是还有很多不符合前端的开发方式地方

1. 不支持node_modules
2. 不支持模块的相对路径
3. 不完整的支持es6 更想用typescript
4. 异步回调方式太难维护代码
5. 组件的支持不够完整


what?

提供完善的前端开发体验 支持babel， typescript

自动编译

解决node_module的支持

how ?

微信小程序的入口是app.json

通过分析app.json 可以得到page的信息

```text
--quick-start
  -- app.js
  -- app.wxml
  -- app.wcss
  -- pages
    -- page-a
    -- page-b
    -- page-c
```

wxml, wcss文件不做处理，只做一个拷贝

分析扫描所有的ts或者js文件，进行模块化处理

ts->js->es5

分析模块依赖，如果是依赖了node_modules下面的模块就直接拷贝到vendor

