const fs = require('fs').promises

function * read () {
  const data = yield fs.readFile('./data.txt', 'utf-8')
  const data2 = yield fs.readFile(data, 'utf-8')
  return data2
}


// const iter = read()
// let a = iter.next()
// Promise.resolve(a.value).then(data => {
//   a = iter.next(data)
//   Promise.resolve(a.value).then(data => {
//     console.log(data)
//   })
// })

function toPromise (gen) {
  return new Promise((resolve, reject) => {
    const iter = gen()
    function next (value) {
      const result = iter.next(value)
      if (result.done) {
        return resolve(result.value)
      }
      Promise.resolve(result.value).then(v => {
        next(v)
      }, reject)
    }
    next()
  })
}

// const b = iter.next(a.value)
// const c = iter.next(b.value)
// console.log(c)
toPromise(read).then(data => {
  console.log(data)
})