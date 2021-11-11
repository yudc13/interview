/**
 * call 实现
 */
function myCall (context, ...args) {
  const fn = Symbol()
  context[fn] = this
  context[fn](...args)
  delete context[fn]
}

/**
 * apply实现
 */
function myApply (context, args) {
  const fn = Symbol()
  context[fn] = this
  context[fn](...args)
  delete context[fn]
}

/**
 * bind实现
 */
function myBind (context, ...args) {
  const self = this
  const Fn = function () {}
  Fn.prototype = self.prototype
  function fBind (...bArgs) {
    // 如果是使用new 调用 则忽略bind指定的this
    self.myApply(Fn.prototype.isPrototypeOf(this) ? this : context, args.concat(bArgs))
  }
  // 保证原型上的方法不丢失
  fBind.prototype = new Fn()
  return fBind
}

Function.prototype.myCall = myCall
Function.prototype.myApply = myApply
Function.prototype.myBind = myBind

function say (age, msg) {
  console.log(`${this.name} age is ${age} say ${msg}`)
}

say.prototype.eat = function () {
  console.log('this is say prototype')
}

say.myCall({ name: 'jack'}, 24, 'hello')
say.myApply({ name: 'tome'}, [22, 'good'])

const newBind = say.myBind({ name: 'jerry' }, 25)
newBind('haha')

const obj = new newBind('xixi')
console.log(obj.constructor)
obj.eat()
