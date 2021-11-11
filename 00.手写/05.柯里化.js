function add (a, b, c, d) {
  return a + b + c + d
}

function curring (fn, ...args) {
  return fn.length > args.length ? (...innerArgs) => curring(fn, ...innerArgs, ...args) : fn(...args)
}

const curringAdd = curring(add)
console.log(curringAdd(1)(2)(3, 4))