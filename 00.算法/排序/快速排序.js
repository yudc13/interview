/**
 * 插入排序
 * 时间复杂度：O(n^2)
 * @param {*} array 
 * @returns 
 */
function insertionSort (array) {
  for (let i = 1; i < array.length; i++) {
    let prevIndex = i - 1
    let value = array[i]
    // 遍历有序区间
    for (; prevIndex >= 0; prevIndex--) {
      if (array[prevIndex] > value) {
        array[prevIndex + 1] = array[prevIndex]
      } else {
        break
      }
    }
    array[prevIndex + 1] = value
  }
  return array
}


console.log(insertionSort([5,3,4,7,2,9]))