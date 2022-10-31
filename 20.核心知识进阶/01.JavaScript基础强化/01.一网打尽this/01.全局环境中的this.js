function fn() {
	console.log(this) // 非严格模式下 node环境中 this指向global
}

function f2() {
	'use strict'
	console.log(this) // 严格模式下，this指向undefined
}

fn()
f2()
