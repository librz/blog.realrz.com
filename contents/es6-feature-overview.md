---
title: An Overview Of ES6+ Features
date: "2020-05-23"
language: zh-CN
category: javascript
---

ES6 也被称为 ES2015，是 ECMA(欧洲电脑制造协会) 在 2015 年推出的 JavaScript 版本。这个版本引入了很多重要的功能，可以说是现代 JavaScript 的标志。本文尝试列举对其中主要的特性

### let & const

在很长一段时间里，JavaScript 一直被以为是“玩具语言”而不受到重视。其中最为令人困惑的特性是提升(hoisting)：在代码被执行之前，用 var 声明的变量都会被提升到其所在的作用域的顶部:

```javascript
console.log(num);
var num = 10;
console.log(num);
```

第二行才声明 num, 第一行就使用了 num, 程序应该报错才对。但是这段代码却成功运行了, 因为 num 的声明被提升到了作用域顶部，也就是 console.log 前面。上述代码等同于：

```javascript
var num;
console.log(num);
num = 10;
console.log(num);
```

此外，你竟然被允许在同一个作用域内用 var 声明多个同名变量:

```javascript
var a = 10;
var a = 20;
console.log(a);
```

这显然会造成困惑，所以在 ES6 之前人们发明了一种补救方法：将 `'use strict';` 作为首行会迫使编译器在遇上这种代码时报错：

```javascript
"use strict";
console.log(num); // 因为有 use strict 的存在，编译器不认可这样的写法，从而抛出错误
var num = 10;
```

JavaScript 设计造成的问题，却要耗费程序员的时间来补救。移除 var 关键字已经不大可能了，这会让无数老项目无法工作。ES6 引入了 let 和 const,  使用这两个关键词声明变量，就不会有 var 的种种问题了：

```javascript
// must declare varialbe before using
console.log(num); // caught ReferenceError: num is not defined
let num = 10;
console.log(name); // caught ReferenceError: num is not defined
const name = "John";
// cannot have mutliple variables in the same name
let a = 10;
let a = 20; // Uncaught SyntaxError: identifier 'a' has already been declared
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
person.name = "John"; // OK, 我们仍然可以改变对象的属性
person = { name: "John" }; // 报错，const 声明的变量不能 reassign
```

### Promise

如果你只能记住一个 ES6 feature，那就记住 Promise 吧。在 ES6 之前，JavaScript 处理异步的方式只能是 **回调函数(callback)**。虽然理论上回调函可以完成一切异步任务，但却不能优雅的应对复杂场景。设想一种有多个回调函数且这些函数之间有嵌套关系的场景：

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

// 打印某人所在国家的首都的人口数量
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

使用回调事情是办到了，任务是完成了，但办事儿的方式显然不优雅：一直嵌套导致可读性很差。试想如果场景更加复杂，情况很快就会失控。代码会变得难以阅读，人们为这种情况起了个名字：**回调地狱 (callback hell)**

这就是 Promise 被引入 JavaScript 的背景，开发者尝试以**链式调用**的方式解决多层嵌套的问题。如果说回调就是俄罗斯套娃的话，Promise 就是一条平整的锁链，更加清晰易懂。用 Promise 解决以上问题的代码如下:

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

Promise 用 .then 进行链式调用, 代码清晰易读并且容易管理和扩展

### 字符模版(Template Literals)语法

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

### 解构(Destructure)语法

```javascript
// 解构对象
const person = { name: "John" };
const { name } = person;
console.log(name);
// 解构数组
const [first, second] = ["john", "lisa", "mike"];
console.log(first, second);
```

### Spread/Rest Operator

用于 **展开** 对象和数组时，叫 **展开运算符**:

```javascript
// 展开对象
const john = {
  name: "John",
  country: "UK",
  city: "London",
  street: "Baker Street",
};
const lisa = { ...john, name: "lisa" };
// 展开数组
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6, 7];
const all = [...arr1, ...arr2];
// 在调用函数时，可以展开数组使其中的元素成为单独的参数:
const nums = [1, 2, 3, 4, 5];
console.log(Math.max(...nums));
```

用于表示 **剩余** 的值时，叫 **剩余运算符**:

```javascript
// 剩余数组
function add(num1, num2, ...rest) {
  // rest 是一个数组，代表剩下的所有参数
  console.log(rest instanceof Array); // true
  let restSum = 0;
  rest.forEach((item) => (restSum += item));
  return num1 + num2 + restSum;
}
add(1, 2, 3, 4); // 10
// 剩余对象
const friend = {
  name: "Richard",
  age: 25,
  gender: "Male",
  profession: "Software Developer"
}
const { gender, ...rest } = friend;
console.log(rest instanceof Object); // true
console.log(rest);
```

### 箭头函数(Arrow Function)

未完待续