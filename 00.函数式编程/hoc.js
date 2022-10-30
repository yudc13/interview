// 高阶函数
// 一个函数 参数是另一个函数


const arr = [1, 2, 3, 4]

// forEach


// reduce
// 注意 reduce 如果没有给第二个参数（也就是prev的初始值）
// 那么循环将从第 1 项开始 数组的第 0 项当作 prev 的初始值

Array.prototype.myReduce = function (cb, init) {
	let prev = init === undefined ? this[0] : init
	let index = init === undefined ? 0 : 1
	for (let i = index; i < this.length; i++) {
		prev = cb(prev, this[i], i)
	}
	return prev
}

const result = arr.myReduce((prev, cur, index) => {
	console.log(prev, cur, index)
	return prev + cur
}, 10)

console.log(result)
