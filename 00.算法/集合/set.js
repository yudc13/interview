/**
 * Set成员是唯一的 不重复的
 */

// Set函数可以接受一个数组（或者具有iterable接口的其他数据结构）
const s = new Set([1,4]);

[2,3,4,4,6,6].forEach(n => s.add(n))

for (let i of s) {
  console.log(i)
}

console.log(s, s.size)

// 去重
const arr = [...new Set([1,1,2,2,4])]
console.log(arr)

// 利用Array.from 将Set转为数组
const items = new Set([1,2,3,4,5])
const array = Array.from(items)
console.log(array)

// 遍历Set

// 以下都返回一个遍历器对象
console.log(items.keys()) // [Set Iterator] { 1, 2, 3, 4, 5 }
console.log(items.values()) // [Set Iterator] { 1, 2, 3, 4, 5 }
console.log(items.entries()) // [Set Entries] { [ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 4 ], [ 5, 5 ] }

items.forEach((value, key) => {
  console.log(value, key)
})