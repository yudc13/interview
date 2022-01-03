/**
 * new 关键字的原理
 * 1 创建一个新对象
 * 2 将新对象的__proto__指向构造函数的prototype属性
 * 3 将构造函数的this指向新对象
 * 4 执行构造函数
 * 5 如果构造函数返回时是一个对象 则返回该对象，否则返回新对象
 */

 function MyNew () {
  // 创建一个新对象
  // 获取构造函数
  const constructor = Array.prototype.shift.call(arguments)
  const newObject = Object.create(constructor.prototype)
  const result = constructor.apply(newObject, arguments)
  return result && typeof result === 'object' ? result : newObject
}

function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
     console.log(this.name)
  }
}

const person = MyNew(Person, 'jack', 20, 'coder')
console.log(person)




