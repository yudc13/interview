/**
 * import会被js引擎静态分析，在编译阶段引入模块代码
 * 动态引入 不会缓存
 */

function a () {
  function b () {}
  b()
}
a()