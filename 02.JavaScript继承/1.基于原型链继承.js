function Parent () {
  this.name = 'parent'
  this.hobby = ['eat', 'play']
}

Parent.prototype.run = function () {
  console.log(`${this.name} is running`)
}

function Child (name) {
  this.name = name
}

// 原型链继承
Child.prototype = new Parent()
// 修改Child constructor 指向它自己
Child.prototype.constructor = Child

Child.prototype.sayName = function () {
  console.log(`my name is ${this.name}`)
}

// 子类只能给自己的构造函数传参，却不能给父类构造函数传参
const jack = new Child('jack')
jack.sayName() // my name is jack
jack.run() // jack is running
console.log(jack.hobby) // [ 'eat', 'play' ]
jack.hobby.push('sleep')
console.log(jack.hobby) // [ 'eat', 'play', 'sleep' ]


const tom = new Child('tom')
tom.sayName() // my name is tom
tom.run() // tom is running
// 所以子类共享父类的引用值属性
console.log(tom.hobby) // [ 'eat', 'play', 'sleep' ]
