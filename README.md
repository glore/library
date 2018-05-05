# Ufutx library

## Features

* 图书馆管理
  - 创建图书馆
  - 图书分类管理
  - 图书管理
  - 成员管理
  - 借阅管理

* 个人图书馆
  - 同图书馆
  - 好友间互借

* 友书同享
  - 图书免费赠送(但1+3个月必须赠送)
  - 提供免费图片者可获得友福同享购物券

....


扫码访问小程序:

![友福图书馆](https://party.ufutx.com/imgs/mp_library.jpg)


## Usage

### Start

``` bash
git clone git@github.com:glore/library.git
cd library
npm install wepy-cli -g
npm install
npm run dev
```

> **Remind**

- 使用微信开发者工具新建项目，本地开发**选择 `dist` 目录**
- 微信开发者工具 -> 项目
  - **关闭** ES6 转 ES5
  - **关闭** 代码压缩上传
  - **关闭** 上传代码时样式文件自动补全
  - **开启** 开发环境不校验请求域名、TLS版本以及HTTPS证书


### Build
```
npm run build
```


## What's Included

- `npm run dev`
  - Compile `.wpy` files to `.wxml` / `.js` / `.wxss` etc
  - Related NPM packages
  - Copy static files
  - Watch changes

- `npm run build`: Production ready build.
  - Compile `.wpy` files to `.wxml` / `.js` / `.wxss` etc
  - Related NPM packages
  - Minified JavaScript
  - Copy static files



## Thanks

This repository relies on the [wepy](https://github.com/wepyjs/wepy), thanks to the efforts of the author.
For detailed explanation & more functions, checkout the [微信官方小程序文档](https://mp.weixin.qq.com/debug/wxadoc/dev/api/) and [小程序框架wepy文档](https://wepyjs.github.io/wepy/).

This repository is forked form https://github.com/Thunf/wepy-demo-bookmall Thanks Thunf


## Fork It And Make Your Own

You can fork this repo to create your own demo, and run it.



## LICENSE

[LICENSE](https://github.com/Thunf/wepy-demo-bookmall/blob/master/LICENSE)

Please note that the open source protocol for this repository is **GPL**. This means that you have the freedom to run, copy, modify and distribute the software. However, this software your modified itself is bound by GPL.

**You must open the source code**

Copyright (c) 2017 - Ufutx, Glore



2018年4月第二周
总结：  NBVBNMN
    发布0.10版本图书馆
    主要开发任务：用户反映体验bug修改
    小程序开发问题总结
    使用trello管理工作任务使用问题：对于没标记的问题bug，容易忽视
计划：
    周一：版本用户使用反馈
    周二：抽出wepy公用组件，js，等开发文件，准备开发聚会小程序




