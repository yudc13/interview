// 这里outter的闭包和outter指向的是同一个对象（词法环境）吗？
function outter() {
	var a = 1
	return function () {
		console.log(a++)
	}
}
