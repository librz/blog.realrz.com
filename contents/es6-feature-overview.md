---
title: An Overview Of ES6 Features
date: "2020-05-09"
language: zh-CN
category: javascript
---

> ES6 也被称为 ES2015，是 ECMA(欧洲电脑制造协会) 在 2015 年推出的 JavaScript 版本。这个版本引入了很多重要的功能，可以说是现代 JavaScript 的标志。本文是对其中主要的 feature 进行的简要概括

### Promise，革命性的异步 feature

如果你只能记住一个 ES6 feature，那就记住 Promise 吧。在 ES6 之前，JavaScript 处理异步的方式只能是回调函数（callback）。虽然理论上回调函可以完成一切异步任务，但确不能优雅的应对复杂场景。设想一种有多个回调函数且这些函数之间有依赖关系的场景：

```javascript
function getCountry(name, callback) {
  setTimeout(function () {
    callback("China");
  }, 1000);
}

function getCapital(country, callback) {
  setTimeout(function () {
    callback("Beijing");
  }, 1000);
}

function getPopulation(city, callback) {
  setTimeout(function () {
    callback("2153万");
  }, 1000);
}

// 要找到某人所在国家的首都人口
getCountry("John", function (country) {
  getCapital(country, function (capital) {
    getPopulation(capital, function (population) {
      console.log("首都人口为" + population);
    });
  });
});
```

根据一个人的名字得到国家名，再根据国家名得到首都名，再根据首都名得到该首都的人口数量；这 3 个函数每一个函数都是异步（使用 setTimeout 进行模拟）的，而且后面的函数依赖于前面函数的结果；

以上代码会在大约 3 秒后打印：首都人口为 2153 万

使用回调事情是办到了，任务是完成了，但办事儿的方式显然不优雅：一直嵌套导致可读性很差。试想如果场景更加复杂，情况很快就会失控(get out of hand)。代码会无比难以阅读，人们为这种情况起了个名字：回掉地狱 (callback hell)

这就是 Promise 被引入 JavaScript 的背景，聪明的开发者尝试以一种“链式调用”的方式解决嵌套造成的代码可读性问题。如果说回调就是俄罗斯套娃的话，Promise 就是一条平整的锁链，显然更加清晰易懂。

用 Promise 解决以上问题的代码如下:

```javascript
function getCountry(name) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(name);
    }, 1000);
  });
}

function getCapital(country) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("Beijing");
    }, 1000);
  });
}

function getPopulation(city) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("2153万");
    }, 1000);
  });
}

getCountry("John")
  .then(getCapital)
  .then(getPopulation)
  .then((population) => {
    console.log("首都人口为" + population);
  });
```

可以看到 Promise 用 .then 可以方便的进行链式调用，而且代码清晰易读，更关键的是这样的代码有很高的可拓展性（scalability）

### let & const, 是时候和 var 说再见了

在很长一段时间里，JavaScript 一直被以为是“玩具语言”而不受到重视。一些被诟病的点是

### 方便的语法 🙌

1. 字符模版 (Template Literals)
2. 解构
3. 三点运算符

### 错误的决定
