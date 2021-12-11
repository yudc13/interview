const { AsyncParallelHook } = require('tapable')

console.time('AsyncParallelHook')

// 异步并行
// 同时执行tapAsync注册的回调
// 并且所有注册的回调都调用了callback
// 如果其中某一个调用callback传参了，那么后面的则忽略（但是会执行，只是不统计执行时间了）
// 才会执行callAsync的回调
const hook = new AsyncParallelHook(['name'])

hook.tapAsync('1', (name, callback) => {
	setTimeout(() => {
		console.log('1', name)
		callback()
	}, 1000)
})

hook.tapAsync('2', (name, callback) => {
	setTimeout(() => {
		console.log('2', name)
		callback()
	}, 2000)
})

hook.callAsync('AsyncParallelHook', (err) => {
	console.log(err)
	console.timeEnd('AsyncParallelHook')
})
