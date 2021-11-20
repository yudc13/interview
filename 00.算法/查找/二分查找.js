/**
 * 二分查找
 * 最好时间复杂度：O(1)
 * 最坏时间复杂度：O(lgn)
 * @param {*} A 原始数据
 * @param {*} x 需要查找的值
 * @param {*} start 开始下标
 * @param {*} end 结束下标
 * @returns 
 */
function bsSearch (A, x, start, end) {
  let mid = Math.floor((end + start) / 2)
  if (start > end) {
    return - 1
  }
  if (A[mid] === x) {
    return mid
  }
  if (A[mid] > x) {
    end = mid - 1
  } else {
    start = mid + 1
  }
  return bsSearch(A, x, start, end)
}

const A = [1,3,5,7,9, 11,13]
console.log(bsSearch(A, 13, 0, A.length - 1))