# 基于wepy2.0封装的开箱即用框架

---

## 介绍

wepy2.0空项目

> 安装教程：
```npm install```
```npm run dev```

> package.json文件

```json
{
  "name": "mamba_wepy",
  "version": "0.0.1",
  "description": "A WePY project",
  "main": "weapp/app.js",
  "scripts": {
    "dev": "./node_modules/.bin/wepy build --watch",
    "build": "cross-env NODE_ENV=production ./node_modules/.bin/wepy build --no-cache",
    "clean": "rm -rf weapp",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "wepy": {
    "module-a": false,
    "./src/components/list": "./src/components/wepy-list.wpy"
  },
  "author": "mamba <dengzhifeng_63@163.com>",
  "license": "MIT",
  "dependencies": {
    "@wepy/core": "^2.0.0-alpha.16",
    "@wepy/use-promisify": "^2.1.0",
    "@wepy/x": "^2.0.2",
    "dayjs": "^1.11.7",
    "miniprogram-slide-view": "0.0.3"
  },
  "devDependencies": {
    "@babel/core": "^7.1.0",
    "@babel/preset-env": "^7.1.0",
    "@wepy/babel-plugin-import-regenerator": "0.0.2",
    "@wepy/cli": "^2.0.0-alpha.28",
    "@wepy/compiler-babel": "^2.0.1",
    "@wepy/compiler-less": "^2.0.1",
    "babel-eslint": "^7.2.1",
    "cross-env": "^5.1.3",
    "eslint": "^3.18.0",
    "eslint-config-standard": "^7.1.0",
    "eslint-friendly-formatter": "^2.0.7",
    "eslint-plugin-html": "^2.0.1",
    "eslint-plugin-promise": "^3.5.0",
    "eslint-plugin-standard": "^2.0.1",
    "less": "^3.8.1",
    "wepy-cli-extend": "^1.0.3",
    "wepy-eslint": "^1.5.3"
  }
}

```
