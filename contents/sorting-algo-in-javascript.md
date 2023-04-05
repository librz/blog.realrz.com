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

_将数组分为两部分，一部分是已经排序，一部分是未排序。不断扩充已排序数组，直到没有未排序的数组为止。通过 2 层循环实现，内层循环用于寻找未排序数组中最小的值，在外层循环中进行 swap 和遍历。_

```javascript
function selectionSort(arr) {
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

时间复杂度：O(n^2)

### 冒泡排序 (bubble sort)

_2 层循环，外层循环进行简单的遍历；内层循环是关键，遍历数组，在遍历的过程中对数组中相邻元素进行比较，如果发现右边的元素比左边的小，就互换位置。_

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

虽然这个算法写起来简单，但个人感觉解决方式和问题本身没有很明显的联系，要经过一番思考才能明白为什么相邻元素互换能够达到目的。

时间复杂度：O(n^2)

### 归并排序 (merge sort)

> 未完，会再写
