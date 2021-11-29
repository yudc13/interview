const less = require('less')

/**
 * 将less语法转为css语法
 * 而less-loader主要是处理@import 和 url()
 */
function LessLoader(content) {
	// 异步的 只有调用callback才会往下执行
	const callback = this.async()
	less.render(content, { filename: this.source }, (err, output) => {
		// 让loader继续往下执行
		callback(err, output.css)
	})
}

module.exports = LessLoader
