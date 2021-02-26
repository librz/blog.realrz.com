---
title: JavaScript 中的函数参数
date: "2020-11-28"
language: zh-CN
category: javascript
---

> 高级语言中函数的概念来自于汇编中的 Subroutine, 通过对功能进行切割让代码更加模块化，实现了代码复用。本文是对 JavaScript 中函数参数的介绍

#### 函数的原型链

为了能深入了解函数，首先要清晰函数的原型链。

JavaScript 中有个重要的内置对象 Function, 他是一切函数的构造函数。

```javascript
function print(param) {
  console.log(param);
}
console.log(param.constructor === Function); // true
// 既然 Function 自己是函数，函数的构造函数都是 Function, 那么可以得出 Function 自己是自己的构造函数
console.log(Function.constructor === Function); // true
```

#### length 属性: 函数期待的参数数量

函数对象本身都有 length 属性:

```javascript
function add(a, b) {
  return a + b;
}
console.log(add.hasOwnProperty("length")); // true
```

length 这个属性代表该函数“期待”多少个参数, 在函数定义时就已经确定:

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
console.log(add_v3.length); // 2
```

由于 JavaScript 的极度宽容，你可以传任意长度的参数，但实际传入的参数数量并不会影响 length:

```javascript
function add(a, b) {
  console.log(add.length); // 函数的 length 属性在函数定义时候已经决定
  return a + b;
}

add(10); // 打印 2
add(10, 20); // 打印 2
add(10, 20, 30); // 打印 2
```

#### arguments: 函数运行时才有效

arguments 提供了一种 reference 参数的方式, 只有在函数内部才有意义:

```javascript
console.log(arguments);
// Uncaught ReferenceError: arguments is not defeind
```

在函数运行时，内部的 arguments 代表实际传入的参数数组，但它并不是一个严格意义上的数组:

```javascript
function add(a, b) {
  // arguments 有 length 属性表示实际传入的参数个数
  console.log(arguments.length);
  for (let i = 0; i < arguments.length; i++) {
    // arguments 不是数组却能像数组一样用下标访问元素
    console.log(arguments[i]);
  }
  console.log(typeof arguments);
  /*
  // 因为 arguments 不是数组，不能调用 Function.prototype.forEach 方法
  arguments.forEach(item => {
    console.log(item)
  });
  */
  return a + b;
}

add(10); // 依次打印 1 10 Object
add(10, 20); // 依次打印 2 10 20 Object
add(10, 20, 30); // 依次打印 3 10 20 30 Object
```

arguments 作为一个 Array-Like 对象一直被人们诟病。程序员必须把它当做一个特殊对象来看，不能直接看做是普通数组，这显然加大了心智负担。而且 JavaScript 允许通过下标设置其中的元素, 这有时会生效有时又不会，造成了各种难以理解的 bug, 这里不做展开，只建议不要对 arguments 进行写入操作，把它看成只读对象。

#### rest operator: 天下苦 arguments 久矣

和 arguments 一样，rest operator 也提供已一种 reference 参数的方式。但它确比 arguments 对象更加容易使用。

如果要写一个求和函数，允许用户输入任意数量的参数。用 arguments 实现:

```javascript
function add() {
  let sum = 0;
  // arguments 是一个 Array-Like 对象
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
add(); // 0
add(1); // 1
add(1, 2); // 3
add(1, 2, 3); // 6
```

用 rest operator 也可以实现：

```javascript
function add(...nums) {
  // nums 是一个真正的数组
  return nums.reduce((acc, cur) => (acc += cur), 0);
}
add(); // 0
add(1); // 1
add(1, 2); // 3
add(1, 2, 3); // 6
```

rest operator 是在 ES6 中推出的新功能，在很大程度上可以取代 arguments 关键字。而且在函数体内你获得的是一个真正的数组，不像 arguments 那样只是一个 Array-Like 对象，这显然更加清晰易懂。
