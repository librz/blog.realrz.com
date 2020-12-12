---
title: 动态编程：造表和记忆化
date: "2020-12-12"
language: zh-CN
category: other
---

> 动态编程是优化分治型算法的常见手段，它通过优化子问题来提升解决整个问题的效率。

#### 斐波那契数列

给出数列：1 1 2 3 5 8 ...

除了前 2 个元素为 1 以外，其他元素都是该元素前 2 个元素之和。这样的数列称为斐波那契数列，是数学家斐波那契为了研究兔子繁殖而创建的数学模型。

关于斐波那契数列最常见的问题是第 N 个元素为多少，利用递归我们可以写出如下代码(JavaScript)：

```javascript
function fib(n) {
  if (n <= 2) return 1;
  else return fib(n - 1) + fib(n - 2);
}

console.log(fib(46)); // 使用 node 在几秒钟后打印出结果
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
...
输入 n 越大，重复的计算越多，给出结果所需要的时间会因为计算冗余极速下降。时间复杂度为 O(2^n)。

#### 解决方案 1: 造表 (Tabulation)

```javascript
function fib(n) {
  if (n <= 1) return 1;
  const records = [1, 1];
  // 由于 i 从小到大递增，所以这属于 bottom up 类型的动态编程
  for (let i = 2; i < n; i++) {
    records[i] = records[i - 1] + records[i - 2];
  }
  return records[n - 1];
}

console.log(fib(46)); // 立马打印出结果
```

用一个数组来记录不同参数下的解。这个数组可以看成一个表，下标加 1 就是输入，相应的值代表该输入下的解。

该算法实际构建了这样一个表：

```
下标 参数 解
0   1   1
1   2   1
2   3   2
3   4   3
...
```

这样的做法叫做造表，是动态编程的一种常见方式。就一个循环，时间复杂度为 O(n)。

#### 解决方案 2：记忆化（Memorization）

解决重复计算的方案可以很简单，只要记录下已经计算过的值，下次碰上同样的输入直接取就可以了。这种小技巧被称为记忆化（Memorization）。

我们可以用一个 Map 来作为记忆化的载体：

```javascript
const cache = new Map();

function fib(n) {
  if (n <= 1) return 1;
  if (!cache.has(n)) {
    // top-down 的动态编程, 这相当于：
    // const last = fib(n-1);
    // const secondLast = fib(n-2);
    // cache.set(n, last + secondLast);
    // 可以看到 fib(n-1) 和 fib(n-2) 是顺序关系, 也就是说先计算 fib(n-1) 再计算 fib(n-2)
    cache.set(n, fib(n - 1) + fib(n - 2));
  }
  return cache.get(n);
}

console.log(fib(46)); // 立马打印出结果
```

拿 fib(7) 举例：在计算 fib(7) 的时候已经计算了 fib(6), fib(5), fib(4), fib(3) 并将其结果缓存，fib(1)和 fib(2)又是已知的，所以时间复杂度为 O(n).
由于函数嵌套导致的 call stack 最高大约是 n 层，相比造表多了些进栈和出栈的操作。但这并不影响 O(n), 因为进栈和出栈加起来大约是 2n 次操作，而且进出栈是非常简单的操作，比加法运算要快，所以整体的时耗小于 O(3n)，而 O(3n) 就是 O(n).

#### 实际测试

JavaScript 作为解释型语言比编译语言在执行相同的算法时要慢很多。但如果用 JavaScript 运行有 Memorization 优化的斐波那契算法, 对比没有优化的 C 代码，结果会怎么样呢？

即使快如 C 语言，在输入相同没有优化的情况下，计算所花费的时间也远远超过 JavaScript。
