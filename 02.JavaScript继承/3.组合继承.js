function Parent (name) {
  this.name = name
  this.hobby = ['eat', 'coding', 'sleep']
}

Parent.prototype.print = function () {
  console.log(`my name is ${this.name}, hobby is ${this.hobby}`)
}

function Child (name, age) {
  // 继承属性
  Parent.call(this, name)
  this.age = age
}

// 继承父类原型上的方法
Child.prototype = new Parent()

const jack = new Child('jack', 24)
jack.print() // my name is jack, hobby is eat,coding,sleep
jack.hobby.push('paly')
console.log(jack.hobby) // [ 'eat', 'coding', 'sleep', 'paly' ]
const tom = new Child('tom', 25)
console.log(tom.hobby) // [ 'eat', 'coding', 'sleep' ]