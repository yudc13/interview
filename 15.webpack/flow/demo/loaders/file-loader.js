const { getOptions, interpolateName } = require('loader-utils')
/**
 * 读取文件 返回一个新的文件名
 * @param {*} content 文件内容 Buffer
 */
function FileLoader(content) {
	// 获取webpack配置的options
	const options = getOptions(this) || {}
	// 获取文件名
	const filename = interpolateName(this, options.name, { content })
	// 将文件存到assets对象上
	// this.assets[filename] = content
	this.emitFile(filename, content)
	if (options.esModule || typeof options.esModule === 'undefined') {
		return `export default ${JSON.stringify(filename)}` // esModule
	}
	return `module.exports =  ${JSON.stringify(filename)}` // commonjs
}

FileLoader.raw = true

module.exports = FileLoader
