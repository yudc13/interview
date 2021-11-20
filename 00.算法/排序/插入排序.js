/**
 * 插入排序
 * 最好的时间复杂度：O(n)
 * 最坏的时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * @param {*} A 需要排序的数组
 */
function insertionSort (A) {
  for (let i = 1; i < A.length; i++) {
    // for (let j = i - 1; j >= 0; j--) {
    //   if (A[j] > A[j + 1]) {
    //     [A[j], A[j + 1]] = [A[j + 1], A[j]]
    //   } else {
    //     break
    //   }
    // }
    insert(A, i, A[i])
  }
}

function insert (A, i, x)  {
  let p = i - 1
  // 前面的大，前面的往后移
  // 优化点，不用挨个遍历来确定x的位置，使用二分查找来快速确定x的位置O(nlg(n))
  while (p >= 0 && A[p] > x) {
    A[p + 1] = A[p]
    p--
  }
  A[p + 1] = x
}

const A = [2,1,5,7,4,9,3]
insertionSort(A)
console.log(A)