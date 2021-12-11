const { AsyncSeriesHook } = require('tapable')

const hook = new AsyncSeriesHook(['name'])

hook.tapAsync('1', (name, callback) => {
	console.log('1: ', name)
	callback('error')
})

hook.tapAsync('2', (name, callback) => {
	console.log('2: ', name)
	callback()
})

hook.callAsync('AsyncSeriesHook', (err) => {
	console.log('callAsync', err)
})
