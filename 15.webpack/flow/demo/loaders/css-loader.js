const { getOptions } = require('loader-utils')
const postcss = require('postcss')
function cssLoader(source) {
	const loaderOptions = getOptions(this) || {}
	const callback = this.async()
	const cssPlugin = (options) => {
		return (root) => {
			// 遍历@import
			// 将@import存入[]
			// 删除@import代码块
			root.walkArRules(/^import$/i, (rule) => {
				// 删除import
				rule.remove()
				options.imports.push(rule.params.slice(1, -1)) // 需要去掉双引号 //
			})
		}
	}
	// 收集@import
	let options = { imports: [] }
	// css 语法树
	const pipeline = postcss([cssPlugin(options)])
	pipeline.process(source).then((result) => {
		console.log(result)
		callback(null, result)
	})
}

module.exports = cssLoader
