function mergeSort(arr, l, r) {
	if (l >= r) {
		return
	}
	const mid = l + Math.floor((r - l) / 2)
	mergeSort(arr, l, mid)
	mergeSort(arr, mid + 1, r)
	merge(arr, l, mid, r)
}

function merge(arr, l, mid, r) {
	const temp = arr.slice(l, r + 1)
	let i = l, j = mid + 1
	for (let k = l; k <= r; k++) {
		// 说明左边数组已经比较完了
		if (i > mid) {
			arr[k] = temp[j - l]
			j++
		} else if (j > r) {
			arr[k] = temp[i - l]
			i++
		} else if (temp[i - l] > temp[j - l]) {
			arr[k] = temp[j - l]
			j++
		} else {
			arr[k] = temp[i - l]
			i++
		}
	}
}


const arr = [2,1,3,6,4,7,5]

mergeSort(arr, 0, arr.length - 1)

console.log(arr)
