/**
 * 使用call，apply，bind一般称为显式绑定，根据调用关系来确定的一般称为隐式绑定
 * 显式绑定的优先级大于隐式绑定
 * new绑定的优先级大于显式绑定
 */

function foo() {
	return () => {
		console.log(this.a)
	}
}

const obj1 = {
	a: 2,
}

const obj2 = {
	a: 3,
}

const bar = foo.call(obj1)
console.log(bar)
bar.call(obj2) // 箭头函数的this是不可以修改的
