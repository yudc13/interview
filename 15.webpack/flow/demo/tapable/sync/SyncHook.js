const { SyncHook } = require('tapable')

const syncHook = new SyncHook(['name'])

// 拦截器
syncHook.intercept({
	context: true,
	// 每次注册回调都会执行此方法
	register: (tapInfo) => {
		tapInfo.test = 'test'
		console.log('register ', tapInfo)
	},
	// 执行注册的回调之前执行
	tap: (context, tapInfo) => {
		console.log('tap ', context, tapInfo)
		if (context) {
			context.age = 12
		}
	},
	// 调用call方法之前执行
	call: (context, name) => {
		console.log('call ', context, name)
	},
})

// 注册事件回调
// 第一个参数：如果是字符串表示事件回调名字；也可以是一个配置对象
syncHook.tap('1', (name) => {
	console.log('1', name)
})
syncHook.tap(
	{
		context: true,
		name: '2', // name 必填项
		stage: -1, // 表示注册回调的优先级，值越大越靠后执行
	},
	(context, name) => {
		console.log('2', context, name) // context:  { age: 12 }
	}
)
syncHook.tap(
	{
		name: '3',
		before: '2', // 表示把事件回调3 提前到2之前执行
	},
	(name) => {
		console.log('3', name)
	}
)
// 触发事件
syncHook.call('syncHook')

// 3 syncHook
// 2 syncHook
// 1 syncHook
