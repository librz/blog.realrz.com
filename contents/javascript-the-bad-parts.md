---
title: JavaScript - 差劲的部分
date: "2020-08-09"
language: zh-CN
category: javascript
---

> 不可否认，作为一个在 2 周内就设计完成的语言，JavaScript 本身有许多缺点。本文尝试列举 JavaScript 中那些差劲的特性

#### typeof null === "object", typeof 函数 === "function

```javascript
typeof 1 === "number"; // true
typeof {} === "object"; // true
typeof undefined === "undefined"; // true
typeof null === "null"; // false
typeof null === "object"; // object
```

javascript 把值的类型分为两种：基本类型和对象。

1. null 属于基本类型，但 typeof null === "object"

2. typeof 函数 === "function", 虽然看起来合理，但函数也是对象，这扰乱了“类型可以简单分为基本类型和对象”的思维模型

```javascript
function isObject(param) {
  if (param === null) return false;
  const type = typeof param;
  if (["function", "object"].includes(type)) return true;
  else return false;
}
```

JavaScript 已经提供了判断是否是函数的方法：instanceof

```javascript
function hi() {
  console.log("hi");
}
if (hi instanceof Function) console.log("hi is a function");
```

既然 instanceof 提供了检测函数的方法，typeof 再去做这件事情显然不合理

#### 你可以不显式声明变量就进行初始化，而且这个变量将自动成为全局变量:

```javascript
function doSth() {
  a = 10;
}
doSth();
console.log(a);
```

以上代码不会报错，而会正常打印出 10，这说明 a 跳出了函数 doSth 这个作用域成为了全局变量！这显然污染了全局作用域。

#### 用 var 声明的变量会出现提升（hoisting）

1. 用 var 声明的变量在代码执行前会被提到声明变量所在作用域顶部，造成变量没有声明就可以使用的假象

```javascript
console.log(num); // 这不会报错，而会打印 undefined
var num = 10;
```

2. 在同一个作用域内可以用 var 多次声明同名变量：

```javascript
var a = 10;
var a = 20;
console.log(a);
// 是的，代码竟然能成功运行
```

尽管 ES6 引入了 let 和 var 关键字，不会出现 hoisting 的问题。但是为了兼容性，var 关键字被留了下来。每次我看到代码里面有 var，就会不自主的提高警惕。

#### NaN === NaN 是 false

这个是最为人知的缺点之一，好在有补救方法, 可以使用 Number.isNaN 判断一个变量是不是 NaN

```javascript
let a = Number("hello");
if (Number.isNaN(a)) {
  console.log("NaN Detected");
}
```

#### 既有 null 又有 undefined

在程序语言设计界，一直有争论是否该在编程语言中设置一个表示 “空” 的值。但没有争论的是是否该有 2 个这样的值，遗憾的是 JavaScript 在设计的时候做出了糟糕的决定！

每一个 JavaScript 程序员都需要花时间理解 null 和 undefined 之间的区别:

```javascript
let a; // 没有初始化就是 undefined
let b = null; // null 一般是程序员有意设定的值, 表示空值; 这只是一个 common practice, 因为没人可以阻止你把一个变量显示初始化为 undefined
```

#### class 关键字

JavaScript 的继承机制是原型链（Prototype Chain），这和其他大多数语言中 class 作为实例的蓝图 (class as blueprint) 的机制有着根本的不同。然而在 ES6 中引入了 class 关键字，这么做完全是为了其他语言使用者能够在写 JavaScript 时“感到熟悉”。然而，这种语法糖掩盖了事情的本质，当使用者遇到了一些奇怪的现象时感到困惑却不知道怎么解决。

> 未完，有时间会再写
