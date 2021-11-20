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
		// publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
                    // entry 需要手动引入polyfill 会根据browserslist来兼容
										useBuiltIns: 'usage', // 按需加载polyfills
										corejs: { version: '3.0' },
										targets: {
											// chrome: '58',
											// ie: "11"
										},
									},
								],
							],
							plugins: [
								/**
                 如果你手动引用了插件 @babel/plugin-proposal-class-properties 并使用了它，请确保在引用 @babel/plugin-proposal-class-properties 之前引用 @babel/plugin-proposal-decorators。

                 当使用 legacy: true 模式时，必须在 loose 模式下使用 @babel/plugin-proposal-class-properties 来支持 @babel/plugin-proposal-decorators
                 */
								['@babel/plugin-proposal-decorators', { legacy: true }],
								// loose 规定类属性的声明方式
								// true 使用赋值表达式
								// false 使用Object.defineProperty
								['@babel/plugin-proposal-class-properties', { loose: true }],
							],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					'postcss-loader',
					'less-loader',
				],
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// 如果文件超过指定大小 则使用file-loader去处理
							limit: 10240,
						},
					},
				],
			},
			// {
			// 	test: /\.html$/,
			// 	use: [
			// 		{
			// 			loader: 'html-loader',
			// 		},
			// 	],
			// },
		],
	},
	devServer: {
		port: 3000,
		hot: true,
		static: {
			// 告诉服务器从哪里提供内容
			// 提供额外的静态资源时可配置此项
			// 优先使用output.path，再使用directory
			directory: resolve('assets'),
			// 设置静态资源的URL前缀
			// publicPath: '/dist/',
		},
		devMiddleware: {
			// 将内存中的文件写入磁盘 写入的路径以output.path
			// writeToDisk: true,
			// 配置访问服务的目录，如果没有配置 则默认使用output.publicPath
			// publicPath: '/',
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve('./public/index.html'),
		}),
	],
}
