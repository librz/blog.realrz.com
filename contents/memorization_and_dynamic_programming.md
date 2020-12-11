---
title: 记忆化和动态编程
date: "2020-12-12"
language: zh-CN
category: other
---

> 记忆化(Memorization)是优化算法的常见手段，它可以大幅提高算法的性能。

#### 斐波那契数列

给出数列：1 1 2 3 5 8 ...

除了前 2 个元素为 1 以外，其他元素都是该元素前 2 个元素之和。这样的数列称为斐波那契数列，是数学家斐波那契为了解决兔子繁殖问题而创建的模型。

关于斐波那契数列最常见的问题是第 N 个元素为多少，利用递归我们可以写出如下代码(JavaScript)：

```javascript
function fib(n) {
  if (n <= 2) return 1;
  else return fib(n - 1) + fib(n - 2);
}

console.log(fib(45)); // 使用 node 在几秒钟后打印出结果
```

#### 重复计算

上面的算法给出了正确的解，但却效率不高，核心原因是做了很多重复计算。

下面以 fib(6) 的计算作为说明：

```
                                        fib(6)
                        fib(5)          +               fib(4)
        fib(4)      +       fib(3)      +       fib(3)      +       fib(2)
    fib(3)  +  fib(2) + fib(2) + fib(1) +   fib(2) + fib(1) +       fib(2)
fib(2)+fib(1)+ fib(2) + fib(2) + fib(1) +   fib(2) + fib(1) +       fib(2)
1     +  1   +   1    +    1   +   1    +     1    +   1    +       1
结果: 8
```

可以看到 fib(4) 计算了 2 次，fib(3) 计算了 3 次。
由此可以推算：计算 fib(7) 时，fib(5) 计算了 2 次，fib(4) 计算了 3 次，fib(3) 计算了 4 次。
N 越大，重复的计算越多，给出结果所需要的时间会因为计算冗余极速下降。

#### 解决方案：记忆化（Memorization）

解决重复计算的方案可以很简单，只需要用一个键值对记下已经计算过的值，下次碰上同样的输入直接取就可以了。

这种小技巧被称为记忆化（Memorization）。程序员可以自己选择实现记忆化的数据结构，这里给出用 Array 和 Map 的实现：

_(1) 用数组作为记忆化的载体_

```javascript
function fib(n) {
  if (n <= 1) return 1;
  const records = [1, 1];
  // bottom up
  for (let i = 2; i < n; i++) {
    records[i] = records[i - 1] + records[i - 2];
  }
  return records[n - 1];
}

console.log(fib(45)); // 立马打印出结果
```

-(2) 用 Map 作为记忆化的载体-

```javascript
const memo = new Map();

function fib(n) {
  if (n <= 1) return 1;

  if (!memo.has(n)) {
    // top down
    memo.set(n, fib(n - 1) + fib(n - 2));
  }
  return memo.get(n);
}

console.log(fib(45)); // 立马打印出结果
```

#### 到底有多快

JavaScript 作为解释型语言比编译语言在执行相同的算法时要慢很多。但如果用 JavaScript 运行有 Memorization 优化的斐波那契算法, 对比没有优化的 C 代码，结果会怎么样呢？

即使快如 C 语言，在输入相同没有优化的情况下，计算所花费的时间也远远超过 JavaScript。

实际上，没有优化的递归算法的时间复杂度为 O(2^n)，经过 Memorization 优化的时间复杂度为 O(n)。
