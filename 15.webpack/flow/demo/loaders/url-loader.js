const { getOptions, interpolateName } = require('loader-utils')
const mime = require('mime')
/**
 * 读取文件 返回一个新的文件名
 * @param {*} content (默认是字符串) 文件内容 Buffer
 */
function FileLoader(content) {
	// 获取webpack配置的options
	const { limit, fallback = 'file-loader' } = getOptions(this) || {}
	const mimeType = mime.getType(this.resourcePath)
	if (content.length < limit) {
		const base64 = `data:${mimeType};base64,${content.toString('base64')}`
		return `module.exports = ${JSON.stringify(base64)}`
	}
	const fileLoader = require(fallback)
	return fileLoader.call(this, content)
}

FileLoader.raw = true

module.exports = FileLoader
