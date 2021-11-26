const core = require('@babel/core')
const types = require('babel-types')
// const BabelPluginTransformArrowFunction = require('@babel/plugin-transform-arrow-functions')

const sourcecode = `
class Person {
  constructor (name) {
    this.name = name
  }
  sayName() {
    console.log(this.name)
  }
}
`

// 实现一个类转换插件
const BabelPluginTransformClass = {
	visitor: {
		ClassDeclaration(path) {
			const { node } = path
			const { id } = node // Person
			classMethods = node.body.body
			let body = []
			classMethods.forEach((method) => {
				if (method.kind === 'constructor') {
          // 把构造函数转换为普通函数
					body.push(types.functionExpression(id, method.params, method.body, false, false))
				} else {
          // 原型方法
					let left = types.memberExpression(
						types.memberExpression(id, types.identifier('property')),
						method.key
					)
					let right = types.functionExpression(null, method.params, method.body, false, false)
					let assignmentExpression = types.assignmentExpression('=', left, right)
					body.push(assignmentExpression)
				}
			})
      path.replaceWithMultiple(body)
		},
	},
}

// core 只负责生成ast  不负责转换 转换需要插件
let { code } = core.transform(sourcecode, {
	plugins: [BabelPluginTransformClass],
})

console.log(code)
