const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
	mode: 'development',
	entry: resolve('./src/index.js'),
	output: {
		filename: 'bundle.js',
		path: resolve('dist'),
		// 每次生成文件之前 清空output目录（dist）
		clean: true,
		// 以runtime（运行时）或者loader（载入时）所创建的每个URL为前缀
		publicPath: '/',
	},
	devServer: {
		port: 3000,
		hot: true,
		static: {
			// 告诉服务器从哪里提供内容
			// 优先使用output.path，再使用directory
			directory: resolve('assets'),
			// publicPath: '/dist/',
		},
		devMiddleware: {
			// 将内存中的文件写入磁盘 写入的路径以output.path
			// writeToDisk: true,
			// 配置访问服务的目录，如果没有配置 则默认使用output.publicPath
			// publicPath: '/assets/',
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve('./public/index.html'),
		}),
	],
}
