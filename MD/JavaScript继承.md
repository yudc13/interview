### `JavaScript继承方式`

1. 原型链
2. 盗用构造函数
3. 组合继承
4. 原型式继承
5. 寄生式继承
6. 寄生式组合继承

### `1、基于原型链继承`

构造函数、原型、实例的关系

> 每个构造函数都有一个原型对象`prototype`，原型对象`prototype`有一个属性`constructor`指向构造函数
>
> 实例对象有一个内部属性`__proto__`指向构造函数的原型对象`prototype`

原型链继承存在的问题

> 1. 实例共享原型对象上的引用值
> 2. 实例化子类时，不能给父类构造函数传参

```javascript
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


```

### `2、盗用构造函数`

在子类构造函数中使用`call`、`apply`调用父类构造函数，这种方式虽然解决了`基于原型链`继承的缺点，但是又带来了其他问题：

> 1. 子类不能继承父类原型上的属性和方法

```javascript
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

const jack = new Child('jack', 24)
// 不能访问父类原型上的方法
jack.print() // error: jack.print is not a function
jack.hobby.push('paly')
console.log(jack.hobby) // [ 'eat', 'coding', 'sleep', 'paly' ]
const tom = new Child('tom', 25)
console.log(tom.hobby) // [ 'eat', 'coding', 'sleep' ]
```

### `3、组合继承`

综合了`原型链`和`盗用构造函数`两种继承方式

```javascript
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
```

### `4、Object.create()`

也叫原型式继承，在一个对象的基础上创建另一个对象；同样存在共享原型上的引用值

```javascript
function object (o) {
  function F () {}
  F.prototype = o
  return new F()
}
```

### `5、寄生式继承`

其实就是对`Object.create`的增强

```javascript
function createObject (o) {
  const clone = Object.create(o)
  // 添加额外的属性 方法
  clone.say = function () {
    console.log('say...')
  }
  return clone
}
```

### `6、寄生式组合继承`

```javascript
function createObject (Parent, Child) {
  const clone = Object.create(Parent.prototype)
  clone.constructor = Child
  return clone
}

function Parent (name) {
  this.name = name
}

Parent.prototype.say = function () {
  console.log(`Parent: ${this.name} say something`)
}

function Child (age, name) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = createObject(Parent, Child)
console.log(Child.prototype)


const jack = new Child(24, 'jack')
console.log(jack)

```

