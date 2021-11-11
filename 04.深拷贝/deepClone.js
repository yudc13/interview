function isObject (data) {
  return data !== null && typeof data === 'object'
}
/**
 * 深拷贝
 *  使用递归的方式
 * @param {*} data
 */
const map = new WeakMap()

function deepCloneWithRecursion(data) {
  // 1. 如果是基本数据类型 直接返回
  if (!isObject(data)) {
    return data
  }
  // 解决Date, RegExp类型
  if ([Date, RegExp].includes(data.constructor)) {
    return new data.constructor(data)
  }
  const result = Array.isArray(data) ? [] : {}
  // 解决循环引用问题
  const has = map.get(data)
  if (has) {
    return has
  }
  map.set(data, result)
  // 2. 获取对象的keys
  // Reflect.ownKeys 返回的是symbol类型的key 和对象自身的属性（不包含原型上的属性）
  const keys = Reflect.ownKeys(data)
  keys.forEach(key => {
    if (isObject(data[key])) {
      result[key] = deepClone(data[key])
    } else {
      result[key] = data[key]
    }
  })
  return result
}

/**
 * 深拷贝
 *  使用循环的方式
 * @param {*} data
 */
function deepCloneWithLoop (data) {
  // 1. 不是对象类型 直接返回
  if (!isObject(data)) {
    return data
  }
  let root = {}
  const wm = new WeakMap()
  // 使用栈的方式去做
  const stack = [
    {
      key: undefined,
      data,
      parent: root
    }
  ]
  while (stack.length) {
    const node = stack.pop()
    const { key, data, parent} = node
    let result = parent
    if (key) {
      result = parent[key] = Array.isArray(data) ? [] : {}
    }
    if (wm.get(data)) {
      parent[key] = wm.get(data)
      continue
    }
    wm.set(data, result)
    const keys = Reflect.ownKeys(data)
    keys.forEach(key => {
      if (isObject(data[key])) {
        stack.push({
          key,
          data: data[key],
          parent: result
        })
      } else {
        result[key] = data[key]
      }
    })
  }
  return root
}

const obj = {
  name: 'jack',
  point: { x: 0, y: 1 },
  [Symbol()]: 'symbol',
  date: new Date('2021-10-18')
}

// 循环引用
obj.ref = obj

const result = deepCloneWithLoop(obj)

console.log('--> ', result)