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

![友福图书馆](https://library.ufutx.com/imgs/mp_library.jpg)


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



2018/3/17
  用户体验： 藏书中的扫码录书 扫完之后加入收藏了 但是后台数据没有按录入顺序排列
  前端：
    * 收藏上拉下拉 loaded动画



v0.7.01 友福图书馆更新说明：
    * 增加个人藏书阁概念，tabBar重新排列，新增"藏书"、"扫码"， icon更换
    * 藏书
      * 分享转发
      * 扫码录书 => 扫描图书ISBN码，直接加入我的藏书列表
    *扫码
      * ISBN 码输入识别（考虑到有些书的封面没了，就只能输入ISBN码识别）
        * 成功 => 显示图书信息，一键收藏，删除
        * 失败 => 提示未能识别ISBN码，不做录入操作（原因：文本框的输入内容无法限制，防止用户输入不正确的ISBN码录入数据库，导致数据不真实）
      * 扫描识别
        * 成功 => 显示，，一键收藏，删除
          * 支持扫描多书 一键收藏
          * 删除 ps:做了数组去重 扫描了多本同样的书 删除键会一键删除同一本书（用户体验考虑，扫描多本一样的书的时候，删除不需要下翻寻找，一般不找茬的不会扫同一本书多次）
        * 失败 =>
          * 显示录入图书
            * 上传图书封面（*）
            * 填写书名（*）
            * 填写书的作者（*）
            * 填写书的简介（*）



v0.7.04 友福图书馆更新说明：
    * 图书馆页面样式重构
    * 将页面的扫码重构为动画展示
    * 个人图书馆功能移到图书馆详情里面
    * 扫码录书增加分类编辑
2018W12
周一 	福恋小程序=>补充下拉刷新功能、动画、优化icon
      图书馆分享页面带from_openid
      图书馆藏书阁下拉事件bug
周二  	0.7.01版本发布
      扫码已识别跟无法识别isbn的情况,逻辑处理
周三  	微信通知模板（formId）
	    理顺借阅功能
	    画基本dome原型图（借阅）
周四~周五	图书馆详情页面开发	动画样式
          图书馆页面样式重构
          个人图书馆功能移到图书馆详情里面
          扫码录书增加分类编辑
周六	  测试 联调 发布


v0.8 友福图书馆更新说明：
     * 增加社交功能（圈内关注）
          * 用户图书馆分类接口
            * input@ id:用户id
            * return@ 分类id、名字、数量、书名、第一本书的封面
          * 增加数据
            * route:get@/api/user
            * return@ 增加关注、被关注、总藏书的数量、id（需跳转页面）
          * 关注某人的接口
          * 拉取自己关注的接口
          * 拉取自己被谁关注的接口
          * 图书馆增加分类数据
             * route:get@api/libraries/id
             * return@ 增加分类数据
三月 第四周
     周一~周二
        * 福恋资料数据回填bug修改
        * 图书馆分类修改、isbn码识别错误修改
        * 理清图书馆增加社交功能流程，并画简易dome
     周三~周四
        * 依照dome样式开发，抽出共用分类组件
     周五
        * 联调数据 接口
     周六
        * 生病请假

四月第一周
      周一
        * 社交版本发布
        * 福恋版本发布
        * 社交功能开发完;用户关注
      周二~周三
        * 图书收藏、录用 体验优化
        * 机构、管理功能改进：图书管理 分类管理 会员管理 借阅管理



