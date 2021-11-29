const core = require('@babel/core')
/**
 * 自定义loader
 * @param {*} source 源代码
 * @param {*} inputSourceMap 上一个loader生成的sourcemap
 * @param {*} data 本loader额外的数据 本loader pitch的数据
 */
function loader(source, inputSourceMap, data) {
	const options = {
		presets: ['@babel/preset-env'],
		inputSourceMap,
		sourceMap: true, // 是否生成sourcemap
		filename: 'index.js',
	}
	const { code, map, ast } = core.transform(source, options)
	// 需要返回多个值的时候 使用this.callback
	this.callback(null, code, map, ast)
}

module.exports = loader
