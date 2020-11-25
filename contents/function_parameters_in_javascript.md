---
title: JavaScript 中的函数参数
date: "2020-11-23"
language: zh-CN
category: javascript
---

> JavaScript 的函数非常灵活，但灵活也意味着不确定性。本文是对函数参数的总结

#### Function.length

在 JavaScript 中所有的函数都是 Function 对象。用 constructor 可以说明：

```javascript
function add(a, b) {
  return a + b;
}
console.log(add.constructor === Function);
```

Function 本身也是函数，所以:

```javascript
console.log(Function.constructor === Function);
```

Function 类型的 instance (包括 Function 本身)都有 length 属性:

```javascript
function add(a, b) {
  return a + b;
}
console.log(add.hasOwnProperty("length")); // true
console.log(Function.hasOwnProperty("length")); // true
```

length 这个属性代表该函数“期待”多少个参数:

```javascript
function add_v1(a, b) {
  return a + b;
}
console.log(add_v1.length); // 2

// 如果参数中有默认参数，则 length 为第一个默认参数之前的参数个数
function add_v2(a, b = 5, c) {
  return a + b + c;
}
console.log(add_v2.length); // 1

// 参数中不包括用 rest operator 表示的参数
function add_v3(a, b, ...rest) {
  return a + b + rest.reduce((acc, cur) => (acc += cur), 0);
}
console.log(add_v3.length);
```

#### arguments.length

> 未完，会再写
