---
title: JavaScript - 差劲的部分
date: "2020-08-23"
language: zh-CN
category: javascript
---

作为一个在 2 周内就设计完成的语言，JavaScript 有许多问题。本文尝试列举 JavaScript 中那些差劲的部分

### NaN === NaN 是 false

这个是最为人知的缺点之一，好在有补救方法, 可以使用 **Number.isNaN** 判断一个变量是不是 NaN

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
let b = null;
// null 一般是程序员有意设定的值, 表示空值; 
// 这只是一个 common practice, 没人可以阻止你把变量显式的初始化为 undefined
```

在进行 **类型转换(type casting)** 的时候，null 和 undefined 可能会表现不一致:

```javascript
const num1 = Number(null); // 0
const num2 = Number(undefined); // NaN

const str1 = String(null); // 'null'
const str2 = String(undefined); // 'undefined'

const bool1 = Boolean(null); // false
const bool2 = Boolean(undefined); // false
```

### typeof

*typeof* 是 JavaScript 内置关键字，用于获得变量类型。它既可以当做一个 **操作符(operator)** 也可以当做一个 **函数(function)** 来使用:

```javascript
console.log(typeof 1); // number
console.log(typeof("hi")); // string
console.log(typeof {}); // object
```

可惜该功能至少有 2 个缺陷。

在指出问题之前，请先回顾一下 JavaScript 中关于类型的心智模型, 它相当简单:

1. 值的类型可以分为**基本类型(primitives)**和**对象(object)**
2. 基本类型包括: **number, string, boolean, null, undefined, Symbol, BigInt**

一个显而易见的问题是 **typeof null** 给出了让人意想不到的答案:

```javascript
console.log(typeof null); // object
```

另外一个问题稍微隐晦些:

```javascript
console.log(typeof console.log)
```

以上代码的输出会是什么呢？一个很自然的推断是: *console.log* 是一个函数, 由于函数并不属于基本类型，那它的类型只可能是对象

然而实际的输出却是: *function*

好吧，看起来也没那么出乎意料，毕竟 *console.log* 确实是个函数。问题点在于这扰乱了“类型可以简单分为基本类型和对象”的思维模型，创造了一个特例! 当用 *typeof* 判断一个值是不是对象之时需要小心这个特例的存在:

```javascript
function isObject(param) {
  if (param === null) return false; // 特例: typeof null
  const type = typeof param;
  if (type === "function") return true; // 特例: typeof function
  return type === "object";
}
```

那如果真的想要知道某个值是不是一个函数该怎么办呢? 答案是使用 **instanceof**:

```javascript
function isFunction(param) {
  return param instanceof Function;
}
console.log(isFunction({})); // false
console.log(isFunction(console.log)); // true
```

### 隐式类型转换

还是这个简单的思维模型：javascript 把值的类型分为两种：基本类型和对象。

有如下代码:

```javascript
const name = "John Blake";
console.log(typeof name); // string
console.log(name instanceof String); // false

const firstName = name.split(" ")[0];
// name 之所以能够调用 split 方法是因为 name 被隐式转换为了 String 对象！
// 这种由基本类型转为对象的操作也被称为装箱(Boxing)
console.log(firstName);
```

name 是 **string literal(字符串字面量)**, 属于基本类型，不是对象。但却可以使用 *split* 方法，这是因为 Javascript 在遇到 *name.split* 时，会自动做这样的转换：*String(name).split*。因为 *String.prototype.split* 存在，所以我们得到了想要的结果。

看起来好像 Javascript 为我们提供了方便，在“合适”的时候自动做这个转换。但如果程序员不知道背后发生了什么，会疑惑基本类型不是对象为什么也可以调用各种方法呢？

当碰到隐式类型转换或者语法糖这种东西，我的第一反应是要提高警惕，它们在提供方便的同时掩盖了事物的本质。

### 变量未声明就可以使用

你可以不显式声明变量就进行初始化，而且这个变量将自动成为全局变量:

```javascript
function doSth() {
  a = 10;
}
doSth();
console.log(a);
```

以上代码不会报错，而会正常打印出 10，这说明 a 跳出了函数 doSth 这个作用域成为了全局变量！这显然污染了全局作用域。

### Hoisting(变量提升)

用 var 声明的变量在代码执行前会被提升到声明变量所在作用域顶部，造成变量没有声明就可以使用的假象

```javascript
console.log(num); // 这不会报错，而会打印 undefined
var num = 10;
```

这其实等价于:

```javascript
var num;
console.log(num);
num = 10;
```

### 多次声明同名变量

在同一个作用域内可以用 var 多次声明同名变量:

```javascript
var a = 10;
var a = 20;
console.log(a);
// 是的，代码竟然能成功运行!
```

### 可选参数之后可以有常规参数

JavaScript 允许可选参数，这本身是个好主意，使得函数可以更加灵活。

```javascript
function add(a, b, c = 5) {
  return a + b + c;
}
add(1, 2); // 显而易见 1 是形参 a 的实参，2 是形参 b 的实参
```

但要想让这个主意不造成可能的 bug，需要加一条限制：可选参数之后不能有常规参数。遗憾的是JavaScript 并没有这个限制：

```javascript
function add(a, b = 5, c) {
  return a + b + c;
}
add(1, 2);
// 这里的 1 是 形参 a 的实参, 2 是 哪个形参的实参呢?
// 由于 b 是可选的，你可能以为这样传会跳过 b，这里的 2 是不是形参 c 的实参呢？
```

好的编程语言应该是清晰明确的，以上代码所带来的不确定性其实应该在语言层面就解决。JavaScript, WTF?

### 可选参数传 undefined 相当于不传

```javascript
function isInt(val = 0) {
  return Number.isInteger(val);
}

Number.isInterger(undefined); // false

isInt(undefined); // true, 因为这相当于 getType()
```

### class 关键字

JavaScript 的继承机制是原型链（Prototype Chain），这和其他大多数语言中 class 作为实例的蓝图 (class as blueprint) 的机制有着根本的不同。然而在 ES6 中引入了 class 关键字，这么做完全是为了其他语言使用者能够在写 JavaScript 时“感到熟悉”。然而，这种语法糖掩盖了事情的本质，当使用者遇到了一些奇怪的现象时感到困惑却不知道怎么解决。

> 未完，有时间会再写

### 参考资料

1. [JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
2. [MDN: String Primitives And String Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_primitives_and_String_objects)
