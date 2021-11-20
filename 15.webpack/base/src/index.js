const sum = (a, b) => a + b
const name = 'webpack'
console.log(sum(1, 2), `hello ${name}`)

function readonly(target, key, descriptor) {
	console.log(target, key, descriptor)
	descriptor.writable = false
}

class Person {
	@readonly PI = 3.14
}

const p = new Person()

p.PI = 3.45
console.log(p.PI)
