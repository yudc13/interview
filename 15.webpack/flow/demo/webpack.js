const Complier = require('./complier')
function webpack(options) {
	// 1. 获取命令行参数
	const argvConfig = process.argv.slice(2).reduce((argConfig, item) => {
		const [key, value] = item.split('=')
		argConfig[key.substring(2)] = value
		return argConfig
	}, {})
	console.log(argvConfig)
	// 2. 合并参数
	const config = Object.assign({}, options, argvConfig)
	// 3. 生成complier对象
	const complier = new Complier(config)
	// 4. 加载插件
	if (config.plugins && Array.isArray(config.plugins)) {
		for (plugin of config.plugins) {
			// 执行插件 调用插件的apply方法
			plugin.apply(complier)
		}
	}
	return complier
}

module.exports = webpack
