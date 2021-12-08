const { AsyncParallelHook } = require('tapable')

console.time('AsyncParallelHook')

// 异步并行
// 同时执行tapPromise注册的回调
// 并且所有注册的回调都resolve，resolve传入的值会忽略 reject会有报错信息
// promise状态才会变为fullied
const hook = new AsyncParallelHook(['name'])

hook.tapPromise('1', (name) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('1', name)
			resolve('1')
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
