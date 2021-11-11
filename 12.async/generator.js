function * gen () {
  const val1 = yield 1
  console.log('val1: ', val1)
  const val2 = yield 2
  console.log('val2: ', val2)
  return 'done'
}

const g = gen() // 调用并不会执行
// 第一次调用 result拿到是yield的返回值1, { value: 1, done: false }
let result = g.next() // 遇到yield就停止，但是yield前面的赋值还没有执行
console.log(result)
// 第二次之后调用 next的参数会传给上一次yield的返回值，并赋值
result = g.next(result.value)
console.log(result)
result = g.next(result.value)
console.log(result)