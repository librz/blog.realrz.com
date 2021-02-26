---
title: JavaScript 中的对象和继承
date: "2020-09-07"
language: zh-CN
category: javascript
---

> JavaScript 在设计时参考了 Java 的语法，从 Scheme 那里借鉴了函数式编程的思想，而基于原型的面向对象设计是向 Self 学习的结果。本文对 JavaScript 中面向对象的部分进行说明

#### 面向对象(OOP)的 2 种实现思路

_(1) 类作为实例的蓝图 (Class As Blueprint)_

这种是当前最为普遍的实现方式，Java ｜ C++ ｜ C# 在内的绝大部分语言都采用了这种实现。为了创建对象，你必须先要创建类，类作为实例的模板或者蓝图规定了实例的数据(data property)以及行为(method)。从某种角度看，类其实是一种自定义的复合类型，本身没有实际意义，只作为实例的前提和规范。

_(2) 对象作为原型 (Object As Prototype)_

在基于类的面向对象模型中，对象不能脱离类而存在，这要求程序员先创建一堆模版才能进行下一步工作。而基于原型的 OOP 设计则认为类是不必要的，可以直接 Reference 其他对象的属性来获取某种特性(属性或者方法)，这里的“其他对象”被称为“原型”。有些人把这种直接 Reference 的方式称为借用或者委托(Delegation)。采用这种设计的语言屈指可数，JavaScript 就是其中之一。

#### 函数，函数，函数!

在 JavaScript 中函数是一等公民，你可以把函数当成一个普通的值，把它赋给变量。但函数如此重要，以至于你可以把它看作特等公民。

_(1) 函数是对象_

在 JavaScript 中有个简单的思维模型：除了基本类型都是对象。基本类型包括 Number, Boolean, String, BigInt, Symbol, undefined, null，函数不在其中，这说明函数是个对象。对象可以有属性和方法，那函数也可以有属性和方法：

```javascript
function hello() {
  console.log("hello world");
}
// 给 hello 对象添加一个名为 hasParameters 的属性
hello.hasParameters = false;

// 给 hello 对象添加一个名为 logPurpose 的方法
hello.logPurpose = function () {
  console.log("Print out hello world");
};
```

_(2) 函数可以创造对象_

在 “Class As Blueprint” 的语言中，类是面向对象的基础，构造函数依附于类而存在。而在 JavaScript 中构造函数只是个说法，它不是语言规范，只是一种主观意念：如果你用一个函数来创建对象，那么就可以认为它是构造函数。

```javascript
// 定义一个 Person 函数，之所以认为这是个构造函数，是因为它的作用是创建对象
function Person(name, age) {
  // this 是一个关键字，它相当于一个占位符，代表着当前函数作用的对象
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log(`Hi, I'm ${this.name}`);
  };
}

// new 关键字把 Person 里面的 this 实例化并用变量 john 指向这个实例
const john = new Person("John Blake", 24);
john.sayHi(); // Hi, I'm John Blake

// JavaScript 中指定函数中的 this 指向还可以用 bind, call, apply 方法，这里不做展开
```

Person 自己是对象还能够创造对象，这也是说函数是特等公民的原因。就像蚁后是蚂蚁，蚁后还可以产卵创造蚂蚁，所以蚁后是特等蚂蚁一样。

注意：除了 prototype 属性作为实例的原型外(后面会谈到)，Person 自己的属性和其创造的对象的属性无关，这是两个完全不同的对象:

```javascript
Person.purpose = "创造实例"；
// Person 有 purpose 属性，但其创造的实例 john 和这个属性无关
console.log(john.purpose); // undefined
```

#### 内置对象 Object 及 Object.prototype

到底什么是一门编程语言呢？在王垠的[如何掌握所有的程序语言](http://www.yinwang.org/blog-cn/2017/07/06/master-pl)一文中, 他把语言比做组装机，其部件是语言特性：

> 很多人盲目的崇拜语言设计者，只要听到有人设计（或者美其名曰“发明”）了一个语言，就热血沸腾，佩服的五体投地。他们却没有理解，其实所有的程序语言，不过是像 Dell，联想一样的“组装机”。语言特性的设计者，才是像 Intel，AMD，ARM，Qualcomm 那样核心技术的创造者。

通用的语言特性比如：流程控制(if, else, switch), 循环(for, while, do-while), 类型系统, expression 和 statement, 变量声明和赋值，手动/自动垃圾回收，范型，错误处理(try-catch)...

JavaScript 通过原型链这种语言特性来支持面向对象，并且提供了很多内置对象。最基本的对象是 Object 和 Object.prototype，不了解这两个对象，原型链也无从谈起。

_(1) 对 Object 的认识_

Object 是一个构造函数，函数是对象，因此它也是对象，并且提供了一些非常基本的方法：

```javascript
const obj = new Object();
// 使用 Object.defineProperty 方法定义 obj 的 name 属性
// 并不允许用赋值运算符进行修改
Object.defineProperty(obj, "name", {
  value: "Alex",
  writable: false,
});
console.log(obj.name); // "Alex"
obj.name = "Joe"; // 在严格模式下会报错，不可以用 "=" 给其赋值
```

你可能使用过 Object.assign 来做浅拷贝，或者 Object.is 来判断是不是同一个对象，这些都是定义在 Object 本身的静态方法。上面介绍了 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法，这个方法虽然在实际使用中没那么常见，但其提供了非常底层的能力，远比 Object.assign 或者 Object.is 重要。

_(2) 对 Object.prototype 的认识_

这也是个内置对象，和 Object 不同，它不是一个函数对象。

Object.prototype 提供了一些非常重要的属性和方法:

```javascript
const obj = new Object();
Object.defineProperty(obj, "name", {
  value: "Alex",
  writable: false,
});
// 通过 Object.prototype.constructor 可以得到对象的构造函数
// 通过 Object.prototype.hasOwnProperty 可以测试属性是否定义在对象自身
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty("constructor")); // false
```

obj.constructor 其实 reference 了 Object.prototype.constructor 属性，obj.hasOwnProperty reference 了 Object.prototype.hasOwnProperty 方法。

这种 reference 其实就是原型链的追溯，下文会展开。现在只要知道 Object.prototype.constructor 和 Object.protoype.hasOwnProperty 存在及其作用。

#### 对象的创建和原型链

在 JavaScript 中有多种创建对象的方式，下文在介绍这些方式的同时也解释了什么是原型链。

_A. 使用函数_

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

// 函数都自带一个名为 prototype 的属性，该属性本身是个对象，该对象作为被函数创建的实例的原型而存在
Person.prototype.isHuman = true;

// john 是 Person 创建的实例，它的原型是 Person.prototype
// john 自己有 isHuman 属性吗？
// 没有。它的原型 Person.prototype 有吗？
// 有。返回 Person.prototype.isHuman 的值
console.log(john.isHuman); // true

// Person.prototype 本身是对象，对象默认的构造函数是 Object 函数，所以它的原型是 Object.prototype
// Object.prototype 有 hasOwnProperty 方法，用于判断某个属性是存在于对象自身
// john 自己有 hasOwnProperty 方法吗？
// 没有。它的原型 Person.prototype 有吗？
// 没有。它的原型的原型 Object.prototype 有吗？
// 有。返回 Object.prototype.hasOwnProperty 方法
console.log(john.hasOwnProperty("isHuman")); // false

// john 对象的原型链: john => Person.prototype => Object.prototype
```

这里和 class 很像，我们也是先写了一堆模板（Person 函数），然后用这个模板创建了对象实例。不同的是，我们在创建对象后似乎扩展了实例的属性：在代码的最后 john.isHuman 是 true, 但 john.hasOwnProperty('isHuman') 却是 false, 这说明 isHuman 不是 john 自己的属性，但 john 一定有某种方法追溯到 isHuman 属性。john 自己没有定义 hasOwnProperty 方法却可以使用也是这种追溯的结果。

这种追溯的过程就是原型链：当一个属性不属于对象本身时，JS 会寻找该对象的的原型是否有这个属性，有的话就返回，没有的话继续追溯。什么是原型呢？该对象的构造函数的 prototype 属性（有点绕）。可以认为 JS 内部追溯原型链的过程如下：

```javascript
// 如果自己有就返回，否则沿着原型链，一层一层的问原型是否有这个属性
function getPropValue(obj, prop) {
  if (!obj) return undefined;
  if (obj.hasOwnProperty(prop)) return obj[prop];
  const proto = Object.getPrototypeOf(obj);
  // Object 是一个内置函数对象，默认 Object 是对象的构造函数
  // 它自身有一个 getPrototypeOf 方法，这种直接定义在构造函数上的方法被称为“静态方法”
  // 这个方法用于找出对象的原型，也即构造函数的 prototype 属性
  return getPropValue(proto, prop);
}
```

可以看到，这个递归函数在 3 种情况下会终止并返回结果：

- 对象本身拥有属性
- 对象本身没有该属性但是原型链中某个对象有
- 追溯到原型链顶层还没有匹配到属性的时候

可以直接用 obj.hasOwnProperty 是因为除非显式指明，对象的原型链最后一环会默认是 Object.prototype(对象的构造函数默认是 Object)，而 hasOwnProperty 方法存在于 Object.prototype 这个对象本身。这里的“最后一环”是因为 Object.getPrototypeOf(Object.prototype) 为 null, 也就是说 Object.prototype 没有合法的原型，是原型链的终点。

_B. 使用 class 关键字（不推荐）_

在 2015 年推出的 JavaScript 版本 ES6 中引入了 class 关键字，这是种语法糖：语法上类似 Java 等传统面向对象语言，但实际底层还是"构造函数+原型链"。

新写法完全是为了方便日常用其他语言的程序员能够获得一种“熟悉感”，但不可否认这种做法掩盖了事情的本质，遇到稍微复杂的情况就会让人感到困惑。JSON 的作者 Douglas Crockford 认为这是种差劲的特性，我也大致认同。实际上，大部分的语法糖都是在牺牲人们对事物本质的理解的基础上带来一点便捷性。

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

_C. 使用对象字面量(Object Literal):_

字面量是一个使用广泛的编程术语，在代码中直接出现的值都是字面量：

```javascript
const num = 2; // 这里的 2 是字面量
const name = "Alex Jones"; // "Alex Jones" 是字面量
const numIsEven = true; // true 是字面量
```

对于 JS 中的对象来说用大括号直观的表示对象的属性和方法就是对象字面量：

```javascript
const john = {
  name: "John Blake",
  age: 24,
  sayHi: function () {
    console.log(`Hi, I'm ${this.name}`);
  },
};
```

同样, 除非程序员显式指明，所有对象的原型链的最后一环都将是 Object.prototype。我们可以做一系列测试：

```javascript
console.log(john.name); // "John Blake"
console.log(john.speed); // undefined

// Object.prototype.constructor 能够给出对象的构造函数
console.log(john.constructor === Object); // true

// Object.getPrototypeOf 用于直接得到函数的原型
console.log(Object.getPrototypeOf(john) === Object.prototype); // true

// 以下代码不报错，说明 john 有办法追溯并使用 Object.prototype.hasOwnProperty 和 Object.prototype.toString 方法
console.log(john.hasOwnProperty("toString")); // false
console.log(john.toString()); // "[object Object]"
```

_D. 使用 Object.create 函数_

Object.create 允许我们在创建对象时就指定该对象的原型。

```javascript
const john = Object.create(null); // 显式指明对象的原型为 null, 所以不会追溯到 Object.prototype

john.name = "John Blake";
john.age = 14;

console.log(john.name); // "John Blake"
console.log(john.hasOwnProperty("name")); // 报错, hasOwnProperty 是 Object.prototype 的方法, john 不能追溯到 Object.prototype
console.log(john.toString()); // 报错，toString 是 Object.prototype 的方法，john 不能追溯到 Object.prototype
```

#### 与原型链有关的操作符和方法

还是以 Person 为例：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log(`Hi, I'm ${this.name}`);
  };
}

Person.prototype.isHuman = true;

const john = new Person("John Blake", 24);
```

_(1) 属性操作符(英文句号或者方括号)_

如果对象本身拥有某种属性或者方法，用英文句号或者方括号可以访问它:

```javascript
// 使用英文句号
console.log(john.name); // John Blake
// 使用英文方括号
console.log(john["name"]); // John Blake

// 调用方法
console.log(john.sayHi()); // Hi, I'm John Blake
console.log(john["sayHi"]()); // Hi, I'm John Blake
```

如果对象本身没有某种属性或者方法，用属性操作符会追溯原型链，直到找到或者追溯到原型链顶层

```javascript
// 句号和方括号作用一样，这里只给出使用句号的版本
console.log(john.name); // John Blake
console.log(john.isHuman); // true
console.log(john.speed); // undefined
console.log(john.speed()); // 报错: Uncaught TypeError: john.speed is not a function
```

_(2) instanceof 操作符_

和属性操作符不一样，instanceof 操作符追溯的不是原型链上的原型，而是原型链上的原型的构造函数（有点绕）：

```javascript
console.log(john instanceof Person); // true
console.log(john instanceof Object); // true
```

_(3) in 操作符_

和属性操作符很像，不过 in 只给出属性是否存在，而不是直接给出属性的值。 in 操作符同样会追溯原型链:

```javascript
console.log("name" in john); // true
console.log("speed" in john); // false
console.log("isHuman" in john); // true
```

_(4) Object.prototype.hasOwnProperty 方法_

判断某种属性或者方法是否是对象本身拥有的:

```javascript
console.log(john.hasOwnProperty("name")); // true
console.log(john.hasOwnProperty("isHuman")); // false
```

_(5) Object.prototype.constructor_

作用：得到对象的构造函数

```javascript
console.log(john.constructor === Person); // true

// 也可以用它得到原型, 稍微麻烦点
const proto = john.constructor.prototype;
console.log(proto.isHuman); // true
```

_(6) Object.getPrototypeOf 方法_

作用很简单: 直接得到对象的原型。

```javascript
const proto = Object.getPrototypeOf(john);
console.log(proto === Person.prototype); // true
```

#### 更多例子：数组和函数的原型链

JavaScript 有很多内置对象，这里对 Array 和 Function 为例对其原型链进行说明。首先要明确一点：JavaScript 把一切类型简单分为 2 种：基本类型和对象。简单直接，这意味着类似数组和函数也是对象。

_(1) JavaScript 没有传统意义上的数组_

数组作为最常见的数据结构，一般的认知是某种特定类型的集合，在初始化时长度和元素类型就应该固定，通过下标来访问元素。而且由于元素类型固定，访问元素的性能很高，只需要知道第一个元素的内存地址和下标通过简单的数学计算就能知道某一个元素的地址。

但 JavaScript 没有单独实现这种数据结构，在没有引擎优化的情况下，数组的底层实现一般是哈希表。

这也是为什么 JavaScript 中数组元素不需要是相同类型，而且我们可以动态改变数组的大小：

```javascript
// 用数组字面量创建数组
const friends = ["John", "Alex", "Lisa", "Mike"];

// 用 Object.prototype.constructor 证明其构造函数是 Array
console.log(friends.constructor === Array); // true

// 在 JS 中 由于弱类型 firends["0"] 等价于 friends[0]
console.log(friends[0]); // John
console.log(firends["0"]); // John
console.log(Object.keys(friends)); // ["0", "1", "2", "3"]
console.log(1 in frieds); // true

// 利用原型链调用定义在 Array.prototype 上的各种方法
friends.pop();
friends.push("Kate");
friends.splice(1, 2, "Phil", "Joe", "Michael");

// 原型链: friends => Array.prototype => Object.prototype
```

以上代码调用了 pop | push | splice 方法，但数组本身没有这些方法，他们被定义在 Array.prototype 上. 这也是为什么查 API 的时候，看到的是 Array.prototype.push 而不是 Array.push

我们甚至可以通过扩展 Array.prototype 来扩展数组的能力：

```javascript
Array.prototype.partition = function (condition) {
  const arr_1 = [];
  const arr_2 = [];
  this.forEach((item) => {
    if (condition(item)) arr_1.push(item);
    else arr_2.push(item);
  });
  return [arr_1, arr_2];
};

const nums = [1, 3, 4, 10, 15, 35, 50];

const [evenNums, oddNums] = nums.partition((num) => num % 2 === 0);

console.log(evenNums, oddNums);
```

_(2) 函数的原型链_

除了基本类型都是对象，函数也不例外。为了便于描述，这里称函数为函数对象。

所有的函数对象的构造函数都是 Function, 可以用 Object.prototype.constructor 来说明：

```javascript
function print(param) {
  console.log(param);
}

print.constructor === Function; // true

//原型链: print => Function.prototype => Object.prototype
```

Function 本身也是个函数对象, 且自己是自己的构造函数:

```javascript
Function instanceof Object; // true
Function instanceof Function; // true
Function.constructor === Function; // true

//原型链: Function => Function.prototype => Object.prototype
```

本文在写作过程中部分参考了[这篇文章](https://codeburst.io/how-to-do-object-oriented-programming-the-right-way-1339c1a25286)
