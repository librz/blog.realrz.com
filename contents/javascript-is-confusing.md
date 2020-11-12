---
title: JavaScript - 差劲的部分
date: "2020-08-09"
language: zh-CN
category: javascript
---

> 不可否认，JavaScript 本身有许多缺点，很多时候令人困惑甚至恼怒。本文尝试列举 JavaScript 中那些差劲的特性

1. 如果一个变量没有被显式声明就被初始化，那么这个变量将自动成为全局变量:

```javascript
function doSth() {
  a = 10;
}
doSth();
console.log(a);
```

以上代码不会报错，而会正常打印出 10，这说明 a 跳出了函数 doSth 这个作用域成为了全局变量！

2. 在同一个作用域内可以多次声明同名变量：

```javascript
let a = 10;
let a = 20;
console.log(a);
// 是的，代码竟然能成功运行
```

3. NaN === NaN 是 false

这个是最为人知的缺点之一，好在有补救方法, 可以使用 Number.isNaN 判断一个变量是不是 NaN

```javascript
let a = Number("hello");
if (Number.isNaN(a)) {
  console.log("NaN Detected");
}
```

4. 既有 null 又有 undefined

在程序语言设计界，一直有争论是否该在编程语言中设置一个表示 “空” 的值。但没有争论的是是否该有 2 个这样的值，遗憾的是 JavaScript 在设计的时候做出了糟糕的决定！

每一个 JavaScript 程序员都需要花时间理解 null 和 undefined 之间的区别:

```javascript
let a; // 没有初始化就是 undefined
let b = null; // null 一般是程序员有意设定的值, 表示空值; 这只是一个 common practice, 因为没人可以阻止你把一个变量显示初始化为 undefined
```

> 未完，有时间会再写
