// js主线程是单线程的
// 浏览器多进程 渲染进程（内核）

setTimeout(function () {
	console.log(1)
	new Promise((resolve) => {
		console.log(5)
		resolve(6)
	}).then(res => {
		console.log(res)
	})
})

new Promise((resolve) => {
	console.log(2)
	resolve(3)
}).then(res => {
	console.log(res)
	setTimeout(function () {
		console.log(4)
	})
})
