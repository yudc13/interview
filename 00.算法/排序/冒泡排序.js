/**
 * 冒泡排序
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * @param {*} A 待排序的数组
 */
function bubbleSort (A) {
  for (let i = 0; i < A.length; i++) {
    for (let j = 1; j < A.length - i; j++) {
      if (A[j - 1] > A[j]) {
        [A[j - 1], A[j]] = [A[j], A[j - 1]]
      }
    }
  }
}

const A = [1,5,3,8,5,9,2]
bubbleSort(A)
console.log(A)