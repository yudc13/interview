function Parent (name) {
  this.name = name
  this.hobby = ['eat', 'coding', 'sleep']
}

Parent.prototype.print = function () {
  console.log(`my name is ${this.name}, hobby is ${this.hobby}`)
}

function Child (name, age) {
  Parent.call(this, name)
  this.age = age
}

const jack = new Child('jack', 24)
// 不能访问父类原型上的方法
jack.print() // error: jack.print is not a function
jack.hobby.push('paly')
console.log(jack.hobby) // [ 'eat', 'coding', 'sleep', 'paly' ]
const tom = new Child('tom', 25)
console.log(tom.hobby) // [ 'eat', 'coding', 'sleep' ]