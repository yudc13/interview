class LinearSearch {
	static search(data, target) {
		for (let i = 0; i < data.length; i++) {
			if (data[i] === target) {
				return i
			}
		}
		return -1
	}
}

const list = [1, 2, 3, 6, 8]
const result = LinearSearch.search(list, 3)
console.log(result)
