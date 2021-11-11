const arr = [
  [1, 2, 3],
  4,
  5,
  6,
  [[7], [[8]]],
  []
]


function flatten (arr, result = []) {
  for (let item of arr) {
    if (Array.isArray(item)) {
      flatten(item, result)
    } else {
      result.push(item)
    }
  }
  return result
}

function flatten (arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}


function * flat (arr) {
  for (let item of arr) {
    if (Array.isArray(item)) {
      yield *flat(item)
    } else {
      yield item
    }
  }
}

function flatten (arr) {
  let result = []
  for (let item of flat(arr)) {
    result.push(item)
  }
  return result
}

const result = flatten(arr)
console.log(result)

