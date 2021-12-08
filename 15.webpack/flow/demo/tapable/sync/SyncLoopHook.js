const { SyncLoopHook } = require('tapable')

// 返回值为undefined停止循环
// 否则从头开始执行
const hook = new SyncLoopHook(['name'])

let count1 = 0
let count2 = 0
let count3 = 0

// 等到每个回调循环结束（返回undefined）才会执行下一个
hook.tap('1', (name) => {
	console.log('1 count1', count1)
	if (++count1 === 2) {
		count1 = 0
		return
	}
	return true
})
hook.tap('2', (name) => {
	console.log('2 count2', count2)
	if (++count2 === 3) {
		count2 = 0
		return
	}
	return true // 从头开始
})
// hook.tap('3', (name) => {
// 	console.log('3', name)
// })

hook.call('SyncLoopHook')
