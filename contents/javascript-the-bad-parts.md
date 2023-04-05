---
title: JavaScript - 差劲的部分
date: "2020-08-23"
language: zh-CN
category: javascript
---

> 不可否认，作为一个在 2 周内就设计完成的语言，JavaScript 本身有许多缺点。本文尝试列举 JavaScript 中那些差劲的特性

### typeof null === "object", typeof 函数 === "function"

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

既然 instanceof 提供了检测函数的方法，typeof 再去做这件事情显得多余且令人困惑

### string primitive 有时会被隐式转为 string object

还是这个简单的思维模型：javascript 把值的类型分为两种：基本类型和对象。

用 string literal 来创建一个 string primitive：

```javascript
const name = "John Blake";
console.log(typeof name); // string
console.log(name instanceof String); // false
// name 之所以能够调用 split 方法是因为 name 被 Javascript 隐式转换为了 String 对象！
// 这种由基本类型转为对象的操作也被称为装箱(Boxing), 其本质是在基本类型的基础上做了一层 wrapping
const firstName = name.split(" ")[0];
console.log(firstName);
```

name 是 string literal (字符串字面量), 是个基本类型，不是对象。但却可以使用 split 方法，这是因为 Javascript 在遇到 name.split 时，会自动做这样的转换：String(name).split。因为 String.prototype.split 存在，所以我们得到了想要的结果。

[MDN: String Primitives And String Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_primitives_and_String_objects)

看起来好像 Javascript 为我们提供了方便，在“合适”的时候自动做这个转换。但如果程序员不知道这种隐式转换，会疑惑基本类型不是对象为什么也可以调用各种方法呢？

当碰到隐式类型转换或者语法糖这种东西，我的第一反应是要提高警惕，他们在提供方便的同时掩盖了事物的本质。

### 你可以不显式声明变量就进行初始化，而且这个变量将自动成为全局变量:

```javascript
function doSth() {
  a = 10;
}
doSth();
console.log(a);
```

以上代码不会报错，而会正常打印出 10，这说明 a 跳出了函数 doSth 这个作用域成为了全局变量！这显然污染了全局作用域。

### 用 var 声明的变量会出现提升（hoisting）

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

### NaN === NaN 是 false

这个是最为人知的缺点之一，好在有补救方法, 可以使用 Number.isNaN 判断一个变量是不是 NaN

```javascript
let a = Number("hello");
if (Number.isNaN(a)) {
  console.log("NaN Detected");
}
```

### 既有 null 又有 undefined

在程序语言设计界，一直有争论是否该在编程语言中设置一个表示 “空” 的值。但没有争论的是是否该有 2 个这样的值，遗憾的是 JavaScript 在设计的时候做出了糟糕的决定！

每一个 JavaScript 程序员都需要花时间理解 null 和 undefined 之间的区别:

```javascript
let a; // 没有初始化就是 undefined
let b = null; // null 一般是程序员有意设定的值, 表示空值; 这只是一个 common practice, 因为没人可以阻止你把一个变量显示初始化为 undefined
```

在进行类型转换（type casting）的时候，null 和 undefined 有时表现一致，有时不一致

```javascript
const num1 = Number(null); // 0
const num2 = Number(undefined); // NaN

const str1 = String(null); // 'null'
const str2 = String(undefined); // 'undefined'

const bool1 = Boolean(null); // false
const bool2 = Boolean(undefined); // false
```

### 默认参数之后可以有常规参数

JavaScript 运行默认参数，这本身是个好的主意，使得函数可以更加灵活。但要想让这个主意不造成可能得 bug，需要加一条限制：默认参数之后不能有常规参数。很遗憾，JavaScript 没有自带这个限制。

```javascript
// add 函数的第二参数是默认参数，但后面有常规参数 c
function add(a, b = 5, c) {
  return a + b + c;
}

add(1, 2);
// 这里的 1 是 形参 a 的实参, 2 是 哪个形参的实参呢?
// 由于 b 是默认的，你可能以为这样传会跳过 b，这里的 2 是不是形参 c 的实参呢？
```

好的语言特性是确定的，不会让人感到惊讶和困惑。如果我们不在默认参数后面放常规参数，就不会产生上面的问题:

```javascript
function add(a, b, c = 5) {
  return a + b + c;
}

add(1, 2); // 显而易见 1 是形参 a 的实参，2 是形参 b 的实参
```

遗憾的是 JavaScript 不会强制执行这样的规则。

### 默认参数传 undefined 相当于不传

```javascript
function isInt(val = 0) {
  return Number.isInteger(val);
}

Number.isInterger(undefined); // false

isInt(undefined); // true, 因为这相当于 getType()
```

### arguments 对象

arguments 提供了一种在函数体内部 reference 参数的方式。这本身是一个很好的想法

### class 关键字

JavaScript 的继承机制是原型链（Prototype Chain），这和其他大多数语言中 class 作为实例的蓝图 (class as blueprint) 的机制有着根本的不同。然而在 ES6 中引入了 class 关键字，这么做完全是为了其他语言使用者能够在写 JavaScript 时“感到熟悉”。然而，这种语法糖掩盖了事情的本质，当使用者遇到了一些奇怪的现象时感到困惑却不知道怎么解决。

> 未完，有时间会再写
