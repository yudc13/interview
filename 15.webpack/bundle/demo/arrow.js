const core = require('@babel/core')
const types = require('babel-types')
// const BabelPluginTransformArrowFunction = require('@babel/plugin-transform-arrow-functions')

const sourcecode = `
const sum = (a, b) => {
  console.log(this)
  return a + b
}
`

// 实现一个箭头函数转换插件
const BabelPluginTransformArrowFunction = {
	visitor: {
		ArrowFunctionExpression(path) {
			const { node } = path
			// 处理this
			const thisBinding = hoistFunctionEnv(path)
			node.type = 'FunctionExpression'
		},
	},
}

const hoistFunctionEnv = (path) => {
	const thisEnvFn = path.findParent(
		(node) => (node.isFunction() && !node.isArrowFunctionExpression()) || node.isProgram()
	)
  // 找到使用this的地方
	let thisPaths = getScopeInformation(path)
  // 如果有 那么就在父作用创建一个_this来保存this
  if (thisPaths.length > 0) {
    let thisBinding = '_this'
    thisEnvFn.scope.push({
      // 创建一个变量_this
      id: types.identifier(thisBinding),
      init: types.thisExpression() // 初始值
    })
    // 替换this->_this
    thisPaths.forEach(thisChild => {
      let thisRef = types.identifier(thisBinding)
      thisChild.replaceWith(thisRef)
    })
  }
}

const getScopeInformation = (path) => {
	let thisPath = []
	path.traverse({
    // 捕获使用this的地方
		ThisExpression(express) {
      thisPath.push(express)
    },
	})
  return thisPath
}

// core 只负责生成ast  不负责转换 转换需要插件
let { code } = core.transform(sourcecode, {
	plugins: [BabelPluginTransformArrowFunction],
})

console.log(code)
