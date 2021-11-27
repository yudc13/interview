const HtmlWebpackPlugin = require('html-webpack-plugin')
const RunPlugin = require('./demo/plugins/run-plugin')
const DonePlugin = require('./demo/plugins/done-plugin')

const path = require('path')

module.exports = {
	mode: 'development',
	context: process.cwd(),
	entry: path.resolve(__dirname, './src/index.js'),
	devtool: 'source-map',
	output: {
		filename: 'bundle.js',
		chunkFilename: '[name].js',
		clean: true,
		path: path.resolve(__dirname, './dist'),
	},
	module: {
		rules: [
			{
				test: /.js$/,
				use: path.resolve(__dirname, './demo/loaders/test-loader'),
			},
		],
	},
	plugins: [
		// new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, './public/index.html'),
		// }),
		new RunPlugin(),
		new DonePlugin(),
	],
}
