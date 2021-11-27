class RunPlugin {
	constructor(options) {
		this.options = options
	}
	// 每个插件都需要提供一个apply方法
	apply(complier) {
		// 注册监听事件 会在complier调用run方法是执行此监听事件
		complier.hooks.run.tap('RunPlugin', (complier) => {
			console.log('run.....')
		})
	}
}

module.exports = RunPlugin
