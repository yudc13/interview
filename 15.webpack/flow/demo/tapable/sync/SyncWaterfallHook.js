const { SyncWaterfallHook } = require('tapable')

// 返回值不为undefined 则返回值将作为下一个的参数值
const hook = new SyncWaterfallHook(['name'])

hook.tap('1', (name) => {
	console.log('1', name)
})
hook.tap('2', (name) => {
	console.log('2', name)
	return 'stop' // 不执行下面的 3
})
hook.tap('3', (name) => {
	console.log('3', name) // 3 stop
})

hook.call('SyncWaterfallHook')
