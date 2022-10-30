// 将接受多个参数的函数转为接受单一参数的函数

function curring(fn, ...args) {
	const fnLen = fn.length
	return fnLen > args.length ? (...innerArgs) => curring(fn, ...args, ...innerArgs) : fn(...args)
}
