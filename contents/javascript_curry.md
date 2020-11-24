---
title: 柯里化（Currying）
date: "2020-12-09"
language: zh-CN
category: javascript
---

> 未完，会再写

一道面试题，要求写一个 Add 函数，实现如下效果：

```javascript
Add(1)(2)(3); // return 6
Add(1, 2)(3)(4); // return 10
Add(1, 2, ...)(3)(4); // return the sum
```

这里有个概念，柯里化（Currying），它其实完成了这种转换：Add(x, y, z) => Add(x)(y)(z)

实现也很简单，函数嵌套返回就好了：

```javascript
function Add(num1) {
  return function (num2) {
    return function (num3) {
      return num1 + num2 + num3;
    };
  };
}

// 简洁形式
const Add = (num1) => (num2) => (num3) => num1 + num2 + num3;
```

以上代码是“相加”这个操作的柯里化：函数嵌套函数并返回下一级函数，最里层函数进行实际的“加法”操作并返回结果

这里还涉及到作用域的一个特性：里层作用域能够访问外层作用域中的任何参数或者变量

实现

同理，实现“相乘”的柯里化：

```javascript
const multiply = (num1) => (num2) => (num3) => num1 * num2 * num3;
```

和相加的柯里化对比发现：前面都一样，只是最里层函数的操作由相加变为了相乘

我们可以把柯里化单拿出来写成一个函数：

```javascript
const curry = f => num1 => num2 => num3 => f(num1, num2, num3);

function add(a, b, c) {
    return a + b +c;
}

function curriedAdd = curry(add);
console.log(curriedAdd(1, 2,3 )); // 6

function multiply(a, b, c);
function curriedMultiply = curry(multiply);
console.log(curriedMultiply(1, 2, 3)); // 6
```

这样比之前更加通用一些，只需要调用 curry 这个函数，就可以对相加或者相减这样的操作进行柯里化

但还有个限制：上面这个 curry 函数要求被柯里化的函数的参数必须是 3 个。理想的情况是对于任何参数不少于两个的函数都能柯里化（之所以要求不少于 2 个是因为如果只有一个参数柯里化是没有意义的）。

```javascript
const curry = (f, num_of_params);
```
