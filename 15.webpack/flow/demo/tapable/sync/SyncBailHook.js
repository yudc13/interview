const { SyncBailHook } = require('tapable')

// 返回值不为undefined 停止执行后面的
const hook = new SyncBailHook(['name'])

hook.tap('1', (name) => {
	console.log('1', name)
})
hook.tap('2', (name) => {
	console.log('2', name)
	return 'stop' // 不执行下面的 3
})
hook.tap('3', (name) => {
	console.log('3', name)
})

hook.call('SyncBailHook')
