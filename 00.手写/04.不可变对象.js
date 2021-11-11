/**
 * 1. Object.preventExtensions() 让一个对象不可扩展，不能添加新的属性，但是原来的属性依然可以被删除和修改
 * 2. Object.seal() 封闭一个对象，不能添加新属性，并且不能删除原有的属性，但是可以修改
 * 3. Object.freeze() 冻结一个对象，不能添加新的属性，不能删除原有属性，不能修改原有属性
 */

let obj = {
  name: 'jack',
  local: { city: '北京' },
  hobby: [1, 2, 3]
}

// console.log(Object.isExtensible(obj)) // true
// Object.preventExtensions(obj) // 使其不可扩展, 不能添加新的属性
// obj.email = '23242'
// obj.local = 'local'
// delete obj.name
// console.log(Object.isExtensible(obj)) // false

// console.log(Object.isSealed(obj))
// Object.seal(obj)
// obj.a = 'a' // 不能添加新属性
// delete obj.name // 不能删除
// obj.name = 'haha' // 可以修改
// console.log(Object.isSealed(obj))

console.log(Object.isFrozen(obj))
Object.freeze(obj)
obj.a = 'a' // 不能添加新属性
delete obj.name // 不能删除
obj.name = 'haha' // 不可以修改
console.log(Object.isSealed(obj))

console.log(obj)