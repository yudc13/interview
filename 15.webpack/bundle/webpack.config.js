const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, './src/index.js'),
	devtool: 'source-map',
	output: {
		filename: 'bundle.js',
		clean: true,
		path: path.resolve(__dirname, './dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html'),
		}),
	],
}
