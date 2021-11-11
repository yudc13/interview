class Person {
  constructor () {
    // 成员属性和方法
    this.name = 'jack'
    this.hobby = [1,2,3]
    this.say = function () {
      console.log(`hello ${this.name}, ${this.address}`)
    }
  }
  // 原型上的方法
  print () {
    console.log('prototype print')
  }
  run () {
    console.log('prototype run')
  }
  // 实例的属性
  address = [1,2,3]
  // 静态方法
  static locate () {
    console.log('static locate')
  }
  static eat () {
    console.log('static eat')
  }
}

const p = new Person()
p.address.push(1)
p.hobby.push(1)
console.log(p)
const p2 = new Person()
console.log(p2)
console.log(Person.prototype)

Person.locate()
Person.eat()


class XiaoMing extends Person {
  constructor () {
    super();
    this.sleep = function () {
      console.log(this.name)
    }
  }
  static xm () {
    super.locate()
  }
}

const xm = new XiaoMing()
XiaoMing.xm()
XiaoMing.eat()


function one () {
  const a = 'one'
  function two () {
    const b = 'two'
    function three () {
      const c = 'three'
      return function () {
        const d = 'inner'
        console.log(a, b, c, d)
      }
    }
    return three()
  }
  return two()
}
debugger

const inner = one()
inner()