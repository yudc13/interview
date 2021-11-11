// 引用模块
// var add = require('./index')
// console.log(add)
// 模块的名称 就是模块的绝对路径
// console.log(Object.keys(require.cache))



var b = require('./b')

var a = require('./a')



console.log('main(b.x): ', b.x)
console.log('main(a.x): ', a.x)

const c = require('./c')
// 基本类型 值拷贝
// 对象类型 引用拷贝
// console.log(c.counter, c.user.age)
// c.incCounter()


// c.updateAge()
// c.updateAge()
// console.log(c.counter, c.user.age)
console.log('1: ', c.counter)
c.counter = 2000
console.log('2: ', c.counter)
const c2 = require('./c')
console.log('3: ', c2.counter)
c2.print()

