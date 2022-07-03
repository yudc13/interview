/**
 * 选择排序
 * 时间复杂度： O(n^2)
 */


function swap(arr, i, j) {
	let temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

function selectionSort(arr) {
	// 循环不变量
	// 每次循环结束 始终满足arr[0, i)是有序的 arr(i, n)是无序的
	for (let i = 0; i < arr.length - 1; i++) {
		// 找到arr(i, arr.length]中最小的 存放到arr[i]中
		let minIndex = i
		for (let j = i + 1; j < arr.length; j++) {
			// 每次比较都要保证arr[i]是arr[i, j]中最小的
			if (arr[minIndex] > arr[j]) {
				minIndex = j
			}
		}
		swap(arr, i, minIndex)
	}
}

function selectionSort2(arr) {
	// 循环不变量
	// arr[0, i)是无序的 arr(i, n)是有序的
	for (let i = arr.length - 1; i >= 0; i--) {
		let maxIndex = i
		for (let j = i - 1; j >= 0; j--) {
			if (arr[j] > arr[i]) {
				maxIndex = j
			}
		}
		swap(arr, i, maxIndex)
	}
}

const arr = [8,2,7,6,5,1]
selectionSort2(arr)
console.log(arr)

