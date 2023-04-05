---
title: An Overview Of ES6 Features
date: "2020-05-23"
language: zh-CN
category: javascript
---

> ES6 也被称为 ES2015，是 ECMA(欧洲电脑制造协会) 在 2015 年推出的 JavaScript 版本。这个版本引入了很多重要的功能，可以说是现代 JavaScript 的标志。本文对其中主要的 feature 及其出现的背景进行介绍

### Promise，革命性的异步 feature

如果你只能记住一个 ES6 feature，那就记住 Promise 吧。在 ES6 之前，JavaScript 处理异步的方式只能是回调函数（callback）。虽然理论上回调函可以完成一切异步任务，但却不能优雅的应对复杂场景。设想一种有多个回调函数且这些函数之间有依赖关系的场景：

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

使用回调事情是办到了，任务是完成了，但办事儿的方式显然不优雅：一直嵌套导致可读性很差。试想如果场景更加复杂，情况很快就会失控。代码会无比难以阅读，人们为这种情况起了个名字：回掉地狱 (callback hell)

这就是 Promise 被引入 JavaScript 的背景，聪明的开发者尝试以一种“链式调用”的方式解决嵌套造成的代码可读性问题。如果说回调就是俄罗斯套娃的话，Promise 就是一条平整的锁链，显然更加清晰易懂。

Promise 具体的语法可以参见 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise), 用 Promise 解决以上问题的代码如下:

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

在很长一段时间里，JavaScript 一直被以为是“玩具语言”而不受到重视。其中最为令人困惑的特性是提升（hoisting）：在代码被执行之前，所有的变量和函数声明都会被提升到他们所在的作用域的顶部。

```javascript
console.log(num);
var num = 10;
```

第二行才声明 num, 第一行就使用了 num, 程序应该报错才对:

> Uncaught ReferenceError: num is not defined

但是这段代码却成功运行了, 打印出了 `undefined`。因为 num 的声明被提升到了作用域顶部，也就是 console.log 前面。上述代码等同于：

```javascript
var num;
console.log(num);
num = 10;
```

此外，你竟然被允许在同一个作用域内用 var 声明多个同名变量:

```javascript
var a = 10;
var a = 20;
console.log(a);
```

这显然会造成困惑，所以在 ES6 之前人们发明了一种补救方法：将 `'use strict';` 添加到代码首行会迫使编译器在遇上这种代码时报错：

```javascript
"use strict";
console.log(num); // 因为有 use strict 的存在，编译器不认可这样的写法，从而抛出错误
var num = 10;
```

这显然是个蹩脚的做法，javascript 设计造成的问题，却要耗费程序员的时间来补救。我们想要的是从源头解决问题，这就是 ES6 的 let 和 const 诞生的背景，使用这 2 个关键词声明变量，那么这种变量声明都不会被提升：

```javascript
console.log(num); // 编译器会报错
let num = 10;

console.log(name); // 编译器会报错
const name = "John";
```

同一作用域可以声明多个同名变量的问题也解决了:

```javascript
let a = 10;
let a = 20; // 抛出错误: Uncaught SyntaxError: identifier 'a' has already been declared
```

除此之外，let 和 const 还有点不同：let 声明的变量可以被 reassign 而 const 声明的变量不能：

```javascript
let a = 10;
a = 20; // OK, a 可以被 reassign

const b = 20;
b = 30; // 报错，b 不可以被 reassign
```

注意，由于对象是以指针形式被引用的，用 const 声明对象时变量的值其实是对象的内存地址。虽然我们不能改变对象的内存地址，但我们可以改变对象的属性:

```javascript
const person = { name: "Lisa" };
person = { name: "John" }; // 编译器会报错，const 声明的变量不能 reassign
person.name = "John"; // OK, 我们仍然可以改变对象的属性
```

### 方便的语法 🙌

- 字符模版 (Template Literals)

  ```javascript
  let name = "John";
  let age = 10;
  let country = "UK";
  //用字符拼接（String Concatenation）
  console.log(
    "I am " + name + ", currently " + age + " years old, lives in " + country
  );
  //用字符模板
  console.log(`I am ${name}, currently ${age} years old, lives in ${country}`);
  ```

- 解构

1. 对象解构

   ```javascript
   const person = { name: "John" };
   const { name } = person;
   console.log(name);
   ```

2. 数组解构

   ```javascript
   const [first, second] = ["john", "lisa", "mike"];
   console.log(first, second);
   ```

- 三点运算符

1. 用于对象和数组时起展开作用，叫展开运算符（Spread Operator）

   ```javascript
   const john = {
     name: "John",
     country: "UK",
     city: "London",
     street: "Baker Street",
   };

   // 展开对象 john 的所有属性
   const lisa = { ...john, name: "lisa" };

   //  还可以 spread 数组
   const arr1 = [1, 2, 3];
   const arr2 = [4, 5, 6, 7];
   const all = [...arr1, ...arr2];

   // 结合解构，实现部分展开 (这里以普通对象说明，数组同理)
   const { name, street, ...other } = john;
   ```

2. 用于函数参数时，放到参数最后，代表剩余的参数，叫剩余运算符（Rest Operator）

   ```javascript
   function add(num1, num2, ...rest) {
     // rest 是一个数组，代表剩下的所有参数
     let restSum = 0;
     rest.forEach((item) => (restSum += item));
     return num1 + num2 + restSum;
   }

   add(1, 2); // 3

   add(1, 2, 3); // 6

   add(1, 2, 3, 4); // 10
   ```

### 错误的决定

遗憾的是，ES6 中还引入了一些差劲的特性，最著名的就是 class。

JavaScript 中继承的实现是原型链，本来没有 class 一说，但 ECMA 内部一些写 Java 的家伙在没有认清原型链的机制之前强行向 JavaScript 中加入了 class 关键字。class 是构造函数的语法糖，然而这种语法糖掩盖了原型链的本质，使得程序难以理解容易出错。关于这个话题我将在以后的博文中说明
