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
		publicPath: 'auto',
		clean: true,
		path: path.resolve(__dirname, './dist'),
	},
	module: {
		rules: [
			{
				test: /.js$/,
				use: path.resolve(__dirname, './demo/loaders/babel-loader'),
			},
			{
				test: /.png$/,
				use: [
					{
						loader: path.resolve(__dirname, './demo/loaders/url-loader'),
						options: {
							name: '[name].[hash:5].[ext]',
							esModule: false,
							limit: 1 * 1024,
						},
					},
				],
			},
			{
				test: /.less$/,
				use: [
					path.resolve(__dirname, './demo/loaders/style-loader'),
					{
						loader: path.resolve(__dirname, './demo/loaders/css-loader'),
						options: {
							url: false,
							import: true,
							importLoaders: 1,
						},
					},
					path.resolve(__dirname, './demo/loaders/less-loader'),
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html'),
		}),
		new RunPlugin(),
		new DonePlugin(),
	],
}
