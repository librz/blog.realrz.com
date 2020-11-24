---
title: 柯里化（Currying）
date: "2020-12-09"
language: zh-CN
category: javascript
---

#### 什么是柯里化

要求: 写一个 Add 函数，实现如下效果：

```javascript
Add(1)(2)(3); // return 6
Add(2)(3)(4); // return 9
```

这里有个概念，柯里化（Currying），它完成了这种转换：Add(x, y, z) => Add(x)(y)(z)

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
const Add = num1 => num2 => num3 => num1 + num2 + num3;
```

以上代码是“相加”这个操作的柯里化：函数嵌套函数并返回下一级函数，最里层函数进行实际的“加法”操作并返回结果

要使得以上代码能够正常工作，JavaScript 的 2 个特性起了关键性作用：

1. 函数是第一公民：这意味着你可以把函数看成是一个普通的值，这意味着函数可以作为另外一个函数的返回值

2. 里层作用域能够访问外层作用域中的任何参数或者变量(大多数编程语言都是这么做的)

同理，实现“相乘”的柯里化：

```javascript
const multiply = num1 => num2 => num3 => num1 * num2 * num3;
```

和相加的柯里化对比发现：前面都一样，只是最里层函数的操作由相加变为了相乘

#### 把柯里化单独抽象出来

我们可以把柯里化单拿出来写成一个函数：

```javascript
const curry = f => num1 => num2 => num3 => f(num1, num2, num3);

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(2)(3)(4)); // 9

function multiply(a, b, c) {
  return a * b * c;
}
const curriedMultiply = curry(multiply);
console.log(curriedMultiply(2)(3)(4)); // 24
```

这样比之前更加通用一些，只需要调用 curry 这个函数，就可以对相加或者相减这样的操作进行柯里化

#### 通用的柯里化

上面虽然抽象出了柯里化，但还不够通用: 被柯里化的函数的参数必须是 3 个. 使用递归我们可以写出通用的柯里化：

```javascript
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function add(a, b) {
  return a + b;
}

function multiply(a, b, c) {
  return a + b + c;
}

// 不管参数有多少个，都可以柯里化
const curriedAdd = curry(add);
const curriedMultiply = curry(multiply);
```

柯里化后的函数可以很灵活的调用:

1. 向之前一样调用

```javascript
console.log(curriedMultiply(1, 2, 3)); // 6
```

2. 完全柯里化(所有参数完全展开，每个括号里面只放一个参数)

```javascript
console.log(curriedMultiply(1)(2)(3)); // 6
```

3. 部分柯里化

```javascript
console.log(curriedMultiply(1, 2)(3)); // 6
console.log(curriedMultiply(1)(2, 3)); // 6
```

#### 函数柯里化的好处: 偏函数（Partial Function）

这里的偏函数和数学中的偏函数不同，其实起的是默认参数的作用，但却比默认参数更加灵活：

```javascript
function add(a, b = 5) {
  return a + b;
}

// 使用柯里化可以很容易实现用默认参数
const add5 = curry(add)(5);
console.log(add5(10)); // 15

// 不用重写 add 函数，我们就能轻易得到 add6, add7 等等
const add6 = curry(add)(6);
const add7 = curry(add)(7);
```

上面的 add5, add6. add7 把 add 函数的参数中的一部分固定，抽取为新的函数，这样的函数叫做偏函数。

好处显而易见，我们不用复制 add 函数的代码就能轻易构建 add 函数的不同版本。
