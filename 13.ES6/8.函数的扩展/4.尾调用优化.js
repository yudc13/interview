/**
 * 尾调用：函数的最后一步是调用另一个函数
 * 尾调用优化只在严格模式下开启，正常模式无效，
 * 尾调用优化时，函数的调用栈会改写，arguments和caller会失效
 */

function a () {
  console.log(a.caller)
}

function b () {
  a()
}
b()