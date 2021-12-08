const { AsyncParallelBailHook } = require('tapable')

console.time('AsyncParallelHook')

// 异步并行
// 同时执行tapPromise注册的回调
// 如果有一个回调resolve的值不为undefined 则后面的回调依然会执行 只是会忽略后面resolve的值
// 如果有一个回调reject，那么promise返回值为undefined
const hook = new AsyncParallelBailHook(['name'])

hook.tapPromise('1', (name) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('1', name)
			resolve()
		}, 1000)
	})
})

hook.tapPromise('2', (name) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('2', name)
			resolve('2')
		}, 2000)
	})
})

hook.promise('AsyncParallelHook').then((res) => {
	console.log(res)
	console.timeEnd('AsyncParallelHook')
})
