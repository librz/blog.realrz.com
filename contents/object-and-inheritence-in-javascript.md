---
title: JavaScript 中的对象和继承
date: "2020-10-03"
language: zh-CN
category: javascript
---

> JavaScript 是一门支持多种编程范式的语言，可以用它写出过程式函数式以及面向对象的代码。本文对 JavaScript 中面向对象的部分进行说明

本文在写作过程中部分参考了[这篇文章](https://codeburst.io/how-to-do-object-oriented-programming-the-right-way-1339c1a25286)

#### 面向对象的 2 种实现方式

OOP 有 2 种基本的具体实现：

1. 类作为实例的蓝图 (Class As Blueprint For Instances)

这种是当前最为普遍的实现方式，Java ｜ C++ ｜ C# 在内的绝大部分语言都采用了这种实现。为了创建对象，你必须先要创建类，类作为实例的模板或者蓝图规定了实例的数据(data property)以及行为(method)。从某种角度看，类其实是一种自定义的复合类型，本身没有实际意义，只作为实例的前提和规范。

2. 对象作为原型 (Object As Prototype)

在基于类的面向对象模型中，对象不能脱离类而存在，这要求程序员先创建一堆模版才能进行下一步工作。而基于原型的 OOP 设计则认为类是不必要的，要想获取某种通用特性只需要从其他对象那里复制一份就好了，这里的“其他对象”被称为“原型”。 采用这种设计的语言屈指可数，JavaScript 就是其中之一。

#### 对象的创建和原型链

在 JavaScript 中有多种创建对象的方式，下文在介绍这些方式的同时也用代码说明了 JavaScript 实现继承的方式：原型链

1. 使用函数

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log(`Hi, I'm ${this.name}`);
  };
}
const john = new Person("John Blake", 24);
john.sayHi();

Person.prototype.isHuman = true;
console.log("isHuman" in john); // true
console.log(john.hasOwnProperty("isHuman")); // false
```

这里和 class 很像，我们也是先写了一堆模板（Person 函数），然后用这个模板创建了对象实例。不同的是，我们在创建对象后似乎扩展了实例的属性：在代码的最后 'isHuman' in john 是 true, 但 john.hasOwnProperty('isHuman') 却是 false, 这说明 isHuman 不是 john 自己的属性，但 john 一定有某种方法追溯到 isHuman 属性。john 自己没有定义 hasOwnProperty 方法却可以使用也是这种追溯的结果。这种追溯的过程就是原型链：当一个属性不属于对象本身时，JS 会寻找该对象的构造函数的 prototype 属性是否有这个属性（有点绕）。可以认为 JS 内部追溯原型链的过程如下：

```javascript
// 如果自己有就返回，否则一层一层向上追溯
function getPropValue(obj, prop) {
  if (!obj) return undefined;
  if (obj.hasOwnProperty(prop)) return obj[prop];
  const proto = Object.getPrototypeOf(obj);
  return getPropValue(proto, prop);
}
```

可以看到，这个递归函数在 2 种情况下会终止并返回结果：

- 对象本身拥有属性，或者对象本身没有但是原型链中某个对象有
- 追溯到原型链顶层还没有匹配到属性的时候

这里可以直接用 obj.hasOwnProperty 是因为除非显式指明，对象的原型链最后一环会默认是 Object.prototype，而 hasOwnProperty 存在于 Object.prototype 这个对象本身。这里的“最后一环”是因为 Object.getPrototypeOf(Object.prototype) 为 null, 也就是说如果找完了 Object.prototype 还没有找到对应的属性，那说明原型链已经到了尽头。

2. 使用 class 关键字（不推荐）

在 2015 年推出的 JavaScript 版本 ES6 中引入了 class 关键字，这是种语法糖：语法上类似 Java 等传统面向对象语言，但实际底层还是"构造函数+原型链"。新写法完全是为了方便日常用其他语言的程序员能够获得一种“熟悉感”，但不可否认这种做法掩盖了事情的本质，遇到稍微复杂的情况就会让人感到困惑。JSON 的作者 Douglas Crockford 认为这是种差劲的特性，我也大致认同。实际上，大部分的语法糖都是在牺牲人们对本质的了解的基础上造成使用很方便的假象。

用 class 创建对象：

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
const john = new Person("John Blake", 24);
john.sayHi();
```

3. 使用对象字面量(Object Literal):

“对象字面量”真是个糟糕的翻译，但我却毫无办法，因为这或许是最接近英文原意的翻法了。如果用代码来说明很容易理解，所谓“对象字面量”就是直接用“大括号+键值对”的方法直观的表示一个对象：

```javascript
const john = {
  name: "John Blake",
  age: 24,
  sayHi: function () {
    console.log(`Hi, I'm ${this.name}`);
  },
};
```

Again, 除非程序员显式指明，所有对象的原型链的最后一环都将是 Object.prototype。我们可以做一系列测试：

```javascript
console.log("name" in john); // true
console.log("speed" in john); // false
console.log(john.hasOwnProperty("toString")); // false
console.log("toString" in john); // true
```

4. 使用 Object.create 函数

Object.create 允许我们在创建对象时就指定该对象的原型。

```javascript
const john = Object.create(null); // 显式指明对象的原型为 null, 所以不会追溯到 Object.prototype

john.name = "John Blake";
john.age = 14;

console.log("name" in john); // true
console.log(john.hasOwnProperty("name")); // 报错, hasOwnProperty 是 Object.prototype 的方法, john 不能追溯到 Object.prototype
console.log("toString" in john); // false
```

#### 除了基础类型都是对象

JavaScript 把一切类型简单分为 2 种：基本类型和对象。基本类型包括: Boolean, Number, Boolean, null, undefined 以及新加入的 Symbol 和 BigInt. 其他所有类型都可以看做是基本类型的复合类型，而且都是对象。

简单直接，但这意味着类似数组和函数也是对象。

- JavaScript 没有传统意义上的数组

数组作为最常见的数据结构，一般的认知是某种特定类型的集合，在初始化时长度和元素类型就应该固定，通过下标来访问元素。而且由于元素类型固定，访问元素的性能很高，只需要知道第一个元素的内存地址和下标通过简单的数学计算就能知道某一个元素的地址。

但 JavaScript 没有单独实现这种数据结构，而是直接用对象来表示数组。对象的底层实现是哈希表, 所以数组其实相当于其他语言中的哈希表！

这也是为什么 JavaScript 中数组元素不需要是相同类型(不建议这样做)，而且我们可以动态改变数组的大小：

```javascript
const friends = ["John", "Alex", "Lisa", "Mike"];

friends.pop();
friends.push("Kate");
friends.splice(1, 2, "Phil", "Joe", "Michael");

for (let name of friends) {
  console.log(name);
}
```

以上代码调用了 pop | push | splice 方法，但数组本身没有这些方法，他们被定义在 Array.prototype 上. 这也是为什么我们查 API 的时候，最专业的方式是去搜索 "Array.prototype.push" 而不是 "数组 push"

我们甚至可以通过扩展 Array.prototype 来动态扩展数组的能力：

```javascript
Array.prototype.partition = function (condition) {
  const arr_1 = [];
  const arr_2 = [];
  this.forEach(item => {
    if (condition(item)) arr_1.push(item);
    else arr_2.push(item);
  });
  return [arr_1, arr_2];
};

const nums = [1, 3, 4, 10, 15, 35, 50];

const [evenNums, oddNums] = nums.partition(num => num % 2 === 0);

console.log(evenNums, oddNums);
```

- 函数的原型链

除了基本类型都是对象，函数也不例外。

JavaScript 在设计时参考了 Java 的语法，从 Scheme 那里借鉴了函数式编程的思想，而基于原型的 OOP 设计是向 Self 学习的结果。

未完，会再写
