// 接受若干个函数 返回一个函数
// 从右往左依次执行函数
function compose(...fns) {
	return function (args) {
		return fns.reduceRight((pre, cur) => cur(pre), args)
	}
}


function addOne(num) {
	return num + 1
}

function addTwo(num) {
	return num + 2
}

function divTwo(num) {
	return num / 2
}

const result = compose(addOne, addTwo, divTwo)(4)

console.log(result)
