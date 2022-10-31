function Foo() {
	this.bar = 'Lucas'
	return {
		bar: 'jack',
	}
}

/**
 * new 操作符具体做了什么
 * 1. 创建一个空对象
 * 2. 将创建的对象的__proto__指向构造函数的prototype
 * 3. 将构造函数的this指向新创建的对象，并调用构造函数
 * 4. 返回新的对象
 *
 * ⚠️
 * 如果构造函数有返回值，那么需要做一下特殊处理
 * 1. 返回值是基本数据类型，则this还是指向新创建的对象
 * 2. 若构造函数返回的是一个对象，那么this则指向这个对象
 */

const foo = new Foo()
console.log(foo.bar) // jack
