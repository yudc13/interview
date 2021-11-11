
exports.x = 'a1'
// 引用b.js模块
var b = require('./b')
console.log('a.js: ', b)
exports.x = 'a2'