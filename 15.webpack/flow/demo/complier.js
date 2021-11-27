const { SyncHook } = require('tapable')
const fs = require('fs')
const path = require('path')
const types = require('babel-types')
// 将代码转为ast
const parser = require('@babel/parser')
// 遍历ast
const traverser = require('@babel/traverse').default
// 将ast转为代码
const generator = require('@babel/generator').default

class Complier {
	constructor(options) {
		this.options = options
		this.modules = [] // 存放所有模块
		this.chunks = []
		this.assets = {}
		this.hooks = {
			run: new SyncHook(['compiler']), // 表示同步的hook
			done: new SyncHook(['stats']),
			initialize: new SyncHook(),
		}
	}
	run() {
		// 会执行上面注册的run钩子
		this.hooks.run.call()
		// 从入口文件开始 调用相关loader对模块进行编译
		const entryModule = this.buildModule(this.options.entry)
		let chunk = { name: 'main', entryModule, modules: this.modules }
		this.chunks.push(chunk)
		this.chunks.forEach((chunk) => {
			this.assets[`${chunk}.js`] = chunk.name
		})
		let outputPath = this.options.output.path
		if (!fs.existsSync(outputPath)) {
			fs.mkdirSync(outputPath)
		}
		let targetPath = path.join(outputPath, this.options.output.filename)
		for (let file in this.assets) {
			console.log(file)
			fs.writeFileSync(targetPath, this.assets[file])
		}
		this.hooks.done.call()
	}
	/**
	 * 编译模块
	 * 根据模块路径读取文件
	 * 然后使用对应的loader去解析模块
	 * @param {*} modulePath 模块相对路径 './src/index.js'
	 */
	buildModule(modulePath) {
		// 判断modulePath是否是绝对路径
		if (!path.isAbsolute(modulePath)) {
			// 当前的工作目录 /Users/yudachao/Workspace/yudachao/Interview/15.webpack
			const cwd = this.options.context || process.cwd()
			// /Users/yudachao/Workspace/yudachao/Interview/15.webpack/flow/src/index.js
			modulePath = path.join(cwd, modulePath)
		}
		let sourcecode = fs.readFileSync(modulePath, 'utf-8')
		let targetcode
		// 获取配置loaders
		let loaders = []
		// 收集loader
		if (this.options.module && this.options.module.rules) {
			let rules = this.options.module.rules || []
			for (let i = rules.length - 1; i >= 0; i--) {
				if (rules[i].test.test(modulePath)) {
					loaders.push(rules[i].use)
				}
			}
		}
		// 使用loader转换源代码
		for (let i = 0; i < loaders.length; i++) {
			targetcode = require(loaders[i])(sourcecode)
		}
		// process.cwd()： /Users/yudachao/Workspace/yudachao/Interview/15.webpack
		// modulePath： /Users/yudachao/Workspace/yudachao/Interview/15.webpack/flow/src/index.js
		let moduleId = `./${path.posix.relative(process.cwd(), modulePath)}` // ./flow/src/index.js
		// 所有模块
		let module = { moduleId, deps: [] }
		// 模块依赖分析
		const ast = parser.parse(targetcode)
		traverser(ast, {
			CallExpression: ({ node }) => {
				const calleeName = node.callee.name
				if (calleeName === 'require') {
					let requirePath = node.arguments[0].value
					// 获取依赖模块的路径
					const depModulePath = this.getMdouleByPath(requirePath)
					// 得到依赖模块的ID
					const moduleId = `./${path.posix.relative(process.cwd(), depModulePath)}`

					// 修改ast
					node.arguments = [types.identifier(moduleId)]
					module.deps.push(depModulePath)
				}
			},
		})
		const { code } = generator(ast)
		module._source = code // 转换后的代码
		// 递归
		module.deps.forEach((dep) => {
			let depModule = this.buildModule(dep)
			this.modules.push(depModule)
		})
		return module
	}
	// 根据依赖的模块读取模块
	getMdouleByPath(modulePath) {
		// 当前的工作目录
		const cwd = this.options.context || process.cwd()
		// require模块的绝对路径
		modulePath = path.join(cwd, './flow/src', modulePath)
		// 加后缀
		const extensions = [''].concat(this.options.resolve ? this.options.resolve.extensions : ['.js'])
		// 依次尝试性获取模块
		let moduleFullPath
		for (let i = 0; i < extensions.length; i++) {
			moduleFullPath = `${modulePath}${extensions[i]}`
			if (fs.existsSync(moduleFullPath)) {
				break
			}
		}
		return moduleFullPath
	}
}

module.exports = Complier
