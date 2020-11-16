---
title: React 性能优化之代码分割
date: "2020-07-09"
language: zh-CN
category: other
---

> 相信大家都有打开一个网站，加载十几秒还没看到任何有意义内容的经历，要不是白屏，要不是一直在 Loading。使用 React 构建应用时，很容易出现这种情况，本文介绍如何用代码分割解决这类问题。

#### 服务器端渲染 - Web 最基本的工作方式

在 React/Angular/Vue 成为主流之前，网站依靠的都是服务器端渲染（SSR - Server Side Rendering）。也即用户请求资源，服务器返回 HTML，浏览器直接展示。因为 Web 最初的设计是一个信息发布平台（Publishing Plateform），机制是通过超链接把互联网上的文档联系起来。服务器端渲染很贴近 Web 这种设计，简单直接，自然也就成为了当时构建 Web 应用的标准。

但很快人们发现服务端渲染存在不足。服务器端渲染是典型的多页面应用，用户在不同页面间跳转都需要通过网络请求服务端的 HTML 资源。而网络是有延迟的，造成体验不如原生应用。

#### 客户端渲染 - 让 Web 应用如原生般顺滑

React/Angular/Vue 这些支持客户端渲染（CSR - Client Side Rendering）的框架改变了这种局面。他们极度依靠 JavaScript, 通常入口 HTML 文件只有一个 div 标签，通过 JavaScript 在客户端动态去构建页面元素插入到这个 div 标签来构建页面。这种只有一个 HTML 页面的 Web 应用被称为单页应用（Single Page Application）。 一般在加载应用时就加载构建所有页面所需要的 JavaScript 代码，用户在不同页面间跳转时，由于构建页面所需要的 JavaScript 代码已经被存在浏览器本地，只要运行相关的代码就可以完成页面跳转。听起来不如直接请求 HTML 简单直接，但其实这种方式极大地加快了页面跳转的速度，因为原来需要通过网络获取资源而现在运行本地 JavaScript 代码就可以。于是，现在的 Web 应用看起来就像原生应用一样快。

#### 客户端渲染的主要问题 - 过长的 FCP

客户端渲染带来了原生级别的体验，但却存在自己的问题：应用界面一多，生成的 JavaScript 代码的包体积（bundle size）无限膨胀。而客户端依赖 JavaScript 来去动态填充 DOM，如果用户首次使用应用，本地没有缓存，页面会向服务器请求 JavaScript。在此期间，页面要么是白屏要么是 Loading (如果你在入口 HTML 文件中写了 Loading 样式的话)，用户在很长一段时间内看不到实际页面的布局。

衡量页面性能的其中一个标准叫 First Contentful Paint（FCP），客户端渲染生成的 JavaScript 包体积一旦超过一定大小，这个时间就得不到保证。过长的 FCP 极大的降低了用户体验，说不定还会造成大量用户流失。

#### 解决方案 - 代码分割

要解决问题首先要弄清问题为什么发生：JavaScript 包体积过大是因为这里面包含了构建所有页面的代码。假设构建首页的代码需要 100KB，有 50 个子页面，每个子页面需要 200KB 的 JavaScript 代码来构建，那么在用户首次使用网站时他需要加载大约 10MB (100KB + 50 \* 200KB) 的 JavaScript 代码! 很显然如果我们只向用户发送构建对应页面的代码，页面加载速度将会大大降低，这就是代码分割的原理。

使用代码分割有 2 种方案：

1. dynamic import

如果你在使用 CRA(Create React App) 或者 Next.js 那么你可以直接使用 dynamic import:

```javascript
import("./utils").then((utils) => {
  const { CallApi } = utils;
  CallApi("/users");
});
```

2. React.lazy & Suspense

使用 React.lazy 加载的组件需要包上 Suspense 组件， 并设定一个 fallback 属性规定在加载的过程中显示给用户的 Loading 组件

```javascript
import React, { Suspense } from "react";
const Button = React.lazy(() => import("./Button"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Button />
      </Suspense>
    </div>
  );
}
```

#### 最佳实践 - 基于路由进行代码分割

决定在哪里进行代码分割没有一个定论，React 没有相关的强制规定。一种很自然的想法是根据路由进行代码分割，这也通常是最佳实践。假设我们有一个首页和一个 about 页面，可以这样进行代码分割:

```javascript
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);
```
