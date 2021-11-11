var __extends = (function () {
  var extendStatics = function (child, parent) {
    extendStatics = function (c, p) {
      for (var k in p) {
        if (Object.prototype.hasOwnProperty.call(p, k)) {
          c[k] = p[k]
        }
      }
    }
    return extendStatics(child, parent)
  }
  return function (child, parent) {
    extendStatics(child, parent)
    function __() {
      this.constructor = child
    }
    child.prototype = parent === null ? Object.create(parent) : ( __.prototype = parent.prototype, new __())
  }
})()

var Parent = (function () {
  function Parent (name) {
    this.name = name
  }
  // 静态方法和属性
  Parent.ParentStaticName = 'ParentStaticName'
  Parent.ParentStaticFun = function () {
    console.log(`this is Parent static function ${this.ParentStaticName}`)
  }
  // 原型上的方法
  Parent.prototype.eat = function () {
    console.log(`this is parent eat: ${this.name}`)
  }
  return Parent
})()

var Child = (function (_super) {
  __extends(Child, _super)
  function Child (name, age) {
    // 调用父类构造函数
    var _this = _super.call(this, name) || this
    _this.age = age
    return _this
  }
  // 静态方法和属性
  Child.ChildStaticName = 'ChildStaticName'
  Child.ChildStaticFun = function () {
    console.log(`this is Child static function ${Child.ChildStaticName}`)
  }
  // 原型上的方法
  Child.prototype.run = function () {
    console.log(`this is Child run ${this.name} ${this.age}`)
  }
  return Child
})(Parent)

const child = new Child('xm', 30)
child.run()
child.eat()

console.log('Child.ParentStaticName: ', Child.ParentStaticName)
console.log('Child.ChildStaticName: ', Child.ChildStaticName)
Child.ChildStaticFun()
Child.ParentStaticFun()