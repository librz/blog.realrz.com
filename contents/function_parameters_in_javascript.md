---
title: JavaScript 中的函数参数
date: "2020-11-23"
language: zh-CN
category: javascript
---

> JavaScript 的函数非常灵活，但灵活也意味着不确定性。本文是对函数参数的总结

#### Function.length

在 JavaScript 中函数是对象，而且都继承于 Function。用 instanceof 可以说明：

```javascript
function add(a, b) {
  return a + b;
}
console.log(add instanceof Function);
```

而 Function 对象有 length 属性, 所以所有函数都有 length 属性，这个属性代表该函数“期待”多少个参数:

```javascript
function add(a, b) {
  return a + b;
}
console.log(add.length);

// 如果参数中有默认参数，则
```

#### arguments.length

#### Rest Operator

#### 默认参数
