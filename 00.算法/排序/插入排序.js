
function insertionSort(arr) {
	for (let i = 0; i < arr.length; i++) {
		let target = arr[i]
		let j = i
		for (; j - 1 >= 0 && arr[j - 1] > target; j--) {
			arr[j] = arr[j - 1]
		}
		arr[j] = target
	}
}


function insertionSort2(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		let target = arr[i]
		let j = i
		for (; j < arr.length - 1 && target > arr[j + 1]; j++) {
			arr[j] = arr[j + 1]
		}
		arr[j] = target
	}
}

let arr = [3,4,1,5,2,6]
insertionSort2(arr)
console.log(arr)
