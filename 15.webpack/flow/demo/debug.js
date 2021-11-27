const webpack = require('./webpack')
const options = require('../webpack.config')

// 生成complier对象
debugger
const complier = webpack(options)

// 开始执行编译
complier.run((error, stats) => {
	if (error) {
		console.log('error')
		return
	}
	console.log('ok.')
	// console.log(
	// 	stats.toJson({
	// 		assets: true,
	// 		chunks: true,
	// 		modules: true,
	// 		entrypoints: true,
	// 	})
	// )
})
