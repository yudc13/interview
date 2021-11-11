class Parent {
  static ParentName = 'ParentNameStatic'
  static study() {
    console.log(`this is Parent static ${Parent.ParentName}`)
  }
  constructor (public name) {
    this.name = name
  }
  eat () {
    console.log(`Parent ${this.name} eatting`)
  }
}

class Child extends Parent {
  static ChildName = 'ChildNameStatic'
  static study() {
    console.log(`this is Child static ${Child.ChildName}, ${this.age}`)
  }
  constructor (public name, public age) {
    super(name)
    this.age = age
  }
  run () {
    console.log(`Child ${this.name} ${this.age} is running`)
  }
}