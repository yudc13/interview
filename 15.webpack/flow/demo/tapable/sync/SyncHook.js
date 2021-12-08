const { SyncHook } = require('tapable')

const syncHook = new SyncHook(['name'])

syncHook.tap('1', (name) => {
	console.log('1', name)
})
syncHook.tap('2', (name) => {
	console.log('2', name)
})
syncHook.tap('3', (name) => {
	console.log('3', name)
})

syncHook.call('syncHook')
