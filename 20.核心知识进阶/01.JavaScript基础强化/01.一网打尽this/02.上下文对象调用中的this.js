const student = {
	name: 'Lucas',
	fn: function () {
		return this
	},
}

// 使用上下文对象调用函数，函数中的this指向该上下文对象
const stu = student.fn()
console.log(student === stu) // true
