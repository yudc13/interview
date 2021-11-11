var x = 5
var addX = function (value) {
  return value + x
}

module.exports.x = x
module.exports.addX = addX

// 或者下面的也可以
// module.exports = {
//   x,
//   addX
// }

// 模块化
// 用于管理代码，复用代码 解耦
// 命名冲突 全局污染
// 模块间的通讯

// 常见的模块化
// 1。IIFE（立即执行函数）
// 2。AMD
//    在初始化的时候就需要明确说明它需要哪些依赖，即使依赖只用到其中某一个，其他没有使用的都会被加载
// 3。CMD
//    按需加载

//    AMD和CMD比较相似 都是使用define定义模块，使用require使用模块
// 4。CJS
//    同步加载
//    缓存模块
// 5。ESM

// 动态导入 运行时加载