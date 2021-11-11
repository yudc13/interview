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
