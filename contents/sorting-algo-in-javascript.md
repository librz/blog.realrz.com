---
title: 常见排序算法（JavaScript实现）
date: "2020-12-17"
language: zh-CN
category: other
---

### 快排 (quick sort)

递归型算法。从数组中选出任意一个元素作为**基准(pivot)**，对数组进行遍历，每次将当前元素和基准进行比较，这样就能把数组分为 3 组。使用递归一直分，分到不能再分为止。如果熟悉递归，这个思考模型简单直接。

```javascript
function quickSort(arr) {
  if (arr.length < 2) return arr;
  const pivot = arr[0];
  // pivot is just a number, you can use any number in the array as pivot
  // I'm using the first element as pivot because it's guaranteed to exist
  const lows = [];
  const equals = [];
  const highs = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      lows.push(arr[i]);
    } else if (arr[i] === pivot) {
      equals.push(arr[i]);
    } else {
      highs.push(arr[i]);
    }
  }
  const sortedLows = quickSort(lows);
  const sortedHighs = quickSort(highs);
  return sortedLows.concat(equals).concat(sortedHighs);
}
```

**pivot** 用作动词是改变方向或转折的意思，用作名词可以译为转折点。那件事情是我人生的转折点可以说: *That event is the pivot of my life*

代码中用 **pivot** 表示选中的基准非常形象，拿数组中的其他元素和其进行比较，结果分到 *lows, equals, highs* 这 3 个数组中去。仔细想想，基准的作用其实就是**转折**。

时间复杂度: **O(n \* log n)**

### 插入排序 (insertion sort)

认为数组中的第一个元素已经排好序，要做的工作是把其他元素 **插入** 到已排序数组中的合适位置。通过 2 层循环实现，外层循环遍历 **未排序元素**，内层循环遍历 **已排序数组** 以进行插入操作。

```javascript
function insertionSort(arr) {
  if (arr.length < 2) return arr;
  for (let i = 1; i < arr.length; i++) {
    // arr[i] is the number to be inserted
    for (let j = i; j > 0; j--) {
      if (arr[j] >= arr[j - 1]) break;
      // swap with the number before it
      const temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
    }
  }
}
```

注意

* 外层循环的 *index order* 是 *ascending* 的，而内层循环的 *index order* 是 *descending* 的
* 插入的过程是不断和已排序数组中的前一个数值进行比较，如果小于就互换位置

参考视频: [Insertion sort in 2 mins](https://www.youtube.com/watch?v=JU767SDMDvA)

时间复杂度: **O(n^2)**

### 选择排序 (selection sort)

和插入排序类似，将数组分为两部分: 已排序和未排序。不断 **选择** 未排序数组中的最小值来扩充已排序数组，直到没有未排序元素为止。

通过 2 层循环实现，内层循环用于找出未排序数组中的最小值。 外层循环负责 3 件事情:

1. 把每次找到的最小值从未排序数组中拿出来
2. 把每次找到的最小值作为已排序数组的最大值加到已排序数组中去
3. 不断更新 index 以驱动下一次内层循环

巧妙的是由于 3 的存在，我们可以认为所有小于当前 index 的元素组成的数组就是已排序数组，剩下的是未排序数组，这样以来 *1* 和 *2* 只需要通过元素互换就可以完成。

```javascript
function selectionSort(arr) {
  if (arr.length < 2) return aa;
  for (let i = 0; i < arr.length; i++) {
    // 寻找未排序数组中的最小值的下标
    let minIndex = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // swap arr[i] with arr[minIndex]
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
}
```

参考视频: [selectino sort in 3 mins](https://www.youtube.com/watch?v=g-PGLbMth_g)

时间复杂度：**O(n^2)**

### 冒泡排序 (bubble sort)

由于名字起的很形象，所以冒泡排序可能是最为人熟知的排序算法了。

通过两层循环实现，内层循环就是所谓 **冒泡** 的过程，在遍历的过程中对相邻元素进行比较，如果发现左边的元素比右边的大（也就是大泡在小泡前面），就互换位置。

这样感觉好像只要一层循环就够了？试想如下情况：

```
对于数组 [5, 4, 1]
如果只有一层循环将会经历以下步骤：
1. 由于 5 > 4, 互换 -> [4, 5, 1]
2. 由于 5 > 1, 互换 -> [4, 1, 5] 
```

可以发现如果只有一层循环，只能保证最大的"泡"升到最右边，却不能保证第二大的"泡"升到对应的位置，这时就要用到外层循环。

外层循环其实是内层循环运行了 n 次，第一次保证了最大的"泡"升到最右边，第二次保证第二大的"泡"升到次最右的位置，依此类推...

```javascript
const nums = [3, 5, 1, 9, 2, 11, 6];

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}
```

时间复杂度：**O(n^2)**

### 归并排序 (merge sort)

> 未完，会再写
