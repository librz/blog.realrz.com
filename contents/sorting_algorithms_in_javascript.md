---
title: 常见排序算法（JavaScript实现）
date: "2020-12-17"
language: zh-CN
category: other
---

#### 快排 (quick sort)

_递归型算法。随便从数组中选个数作为标准（pivot），对数组进行遍历，遍历过程中将当前元素和标准进行大小比较，这样就能把数组分为 3 组。利用递归一直分，分到不能再分为止。如果熟悉递归，这个思考模型简单直接。_

```javascript
function quickSort(arr) {
  if (arr.length < 2) return arr;
  const pivot = arr[0];
  // pivot is just a number, you can use any number in the array as pivot
  const low = [];
  const middle = [];
  const high = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      low.push(arr[i]);
    } else if (arr[i] === pivot) {
      middle.push(arr[i]);
    } else {
      high.push(arr[i]);
    }
  }
  const sortedLow = quickSort(low);
  const sortedHigh = quickSort(high);
  return [...sortedLow, ...middle, ...sortedHigh];
}
```

pivot 用作动词是改变方向或旋转的意思，用作名词可以译为转折点：He's the pivot of my life. 他是我人生的转折点。

上面代码中用 pivot 表示那个选中的标准非常形象，拿数组中的其他元素和这个 pivot 进行大小比较，根据结果分到 low, middle, high 这 3 个数组中去，这个过程其实就是 pivot (动词)。

时间复杂度: O(n \* log n)

#### 插入排序 (insertion sort)

_不断把未排序的元素插入到已经排好序的数组中。通过 2 层循环实现，外层循环进行简单遍历，内层循环负责插入操作。_

```javascript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j++) {
      // arr[j] is the number to be inserted
      if (arr[j] >= arr[j - 1]) break;
      // swap with the number before it
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}
```

注意插入的机制是不断把要插入元素与前一个元素进行比较，如果小于前一个元素就互换位置，直到前面一个元素比要插入元素小或者到达数组最左边为止。

参考视频: [Insertion sort in 2 mins](https://www.youtube.com/watch?v=JU767SDMDvA)

时间复杂度: O(n^2)

#### 选择排序 (selection sort)

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

#### 冒泡排序 (bubble sort)

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

#### 归并排序 (merge sort)

#### 桶排序 (bucket sort)

#### 计数排序 (counting sort)

#### 基数排序 (radix sort)

> 未完，会再写
