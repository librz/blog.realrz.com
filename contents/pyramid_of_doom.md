---
title: 厄运金字塔
date: "2020-12-08"
language: zh-CN
category: javascript
---

> 在现实中埃及金字塔是古建筑杰作，但在编程世界里没人想要看到像金字塔一般的代码

#### 厄运金字塔 (Pyramid Of Doom)

“厄运金字塔”是一个在编程实践中很常见的现象，当代码嵌套过深在感官上看起来就像金字塔一样。这样的代码难以阅读，对任何尝试理解代码用途和机制的人都将会是厄运。

JavaScript 中容易制造厄运金字塔的地方主要有 2 处：回调函数和属性链

#### 回调地狱 (Callback Hell)

之前有在[博文](http://www.blog.realrz.com/es6-feature-overview)中介绍过，主要思想是通过链式的 Promise 来替代嵌套的回调函数，把嵌套的结构“拍平”，这里不再赘述。

#### 属性链

试想如下代码:

```javascript
function printFirstName(friends) {
  if (friends) {
    if (friends.length > 0) {
      if (friends[0]) {
        if (friends[0].info) {
          if (friends[0].info.basic) {
            console.log(friends[0].info.basic.name);
          }
        }
      }
    }
  }
}

const friends0 = null;
printFirstName(friends0); // 不打印
const friends1 = [];
printFirstName(friends1); // 不打印
const friends2 = [{}];
printFirstName(friends2); // 不打印
const friends3 = [
  {
    info: null,
  },
];
printFirstName(friends3); // 不打印
const friends4 = [
  {
    info: {
      basic: undefined,
    },
  },
];
printFirstName(friends4); // 不打印
const friends5 = [
  {
    info: {
      basic: {
        name: "John Blake",
      },
    },
  },
];
printFirstName(friends5); // 打印 John Blake
```

上面这个函数的作用很简单，给一个 friends 数组，打印第一个元素的 name。

这个过程中做了很多检查：

1. friends 是否存在
2. friends.length 是否大于 0
3. friends[0] 是否有效
4. friends[0].info 是否有效
5. friends[0].info.basic 是否有效

可以看出第 n 步检查依赖于第 n-1 步的检查, 在代码中体现为嵌套关系，我们又遇上“厄运金字塔”。

ES2020 中引入了 optinal-chaining 来解决属性链过长的问题：

```javascript
function printFirstName(friends) {
  if (friends?.[0]?.info?.basic) {
    console.log(friends[0].info.basic.name);
  }
}
// 可以用之前的用例试一下，效果一致
```

使用 ?. 允许读取在属性链上很靠后的属性值而不用考虑该属性链是否有效。它的机制是如果发现其中一环为 nullish (null 或者 undefined)，那么就停止追溯属性链并返回 undefined.

关于 optinal-chaining 的详细说明可以参见 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
