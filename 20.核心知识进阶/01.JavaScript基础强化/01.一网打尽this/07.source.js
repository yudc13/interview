/**
 * bind的实现
 */

function myBind() {
	// 1. myBind内部的this指向调用myBind的函数
	const self = this
	// 2. 获取绑定的上下文对象
	const [context, ...args] = Array.prototype.slice.apply(arguments)
	function bound() {
		const innerArgs = Array.prototype.slice.apply(arguments)
		const allArgs = args.concat(innerArgs)
		let ctx = context
		// 如果使用new来调用bound
		if (this instanceof bound) {
			console.log('use new')
			ctx = this
		}
		// 修复函数参数的length值
		Object.defineProperty(bound, 'length', {
			value: allArgs.length,
		})
		return self.apply(ctx, allArgs)
	}
	return bound
}

Function.prototype.myBind = myBind

const obj = {}

function foo(name, age) {
	this.name = name
	this.age = age
	console.log(this.name, this.age)
}

const baz = foo.myBind(obj)

baz('Lucas', 18)

const ins = new baz('jack', 22)

const bar = foo.bind(obj)

bar('tom', 25)

console.log(baz.length)

console.log(bar.length)
