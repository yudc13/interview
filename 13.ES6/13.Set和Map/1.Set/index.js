/**
 * Set成员变量是唯一的，不重复
 */

const s = new Set([1,2,3,4,5,5])

// 添加元素
s.add(4)

console.log(s)
