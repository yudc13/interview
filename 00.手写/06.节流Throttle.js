/**
 * 规定时间内只执行一次 有规律的执行
 * leading: 表示第一次是否执行，默认执行-true
 * trailing: 最后一次是否执行 默认执行-true
 * @param {*} fn 目标函数
 * @param {*} wait 等待时间
 * @param {*} options { leading: boolean, trailing: boolean }
 */
function throttle(fn, wait, options) {
	let { leading = true, trailing = true } = options || {}
	let context, args, timeout, result
	function later() {
		previous = leading === false ? 0 : Date.now()
		timeout = null
		result = fn.apply(context, args)
	}
	// 记录上一次执行的时间节点
	let previous = 0
	function throttled() {
		context = this
		args = arguments
		let now = Date.now()
		// 处理第一次是否需要执行
		if (!previous && leading === false) {
			// 第一次不执行
			previous = now
		}
		let remaining = wait - (now - previous)
		// 时间间隔已经超过了规定的wait
		if (remaining <= 0) {
			// 清除定时器，防止连续执行
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			result = fn.apply(context, args)
			// 重置previous
			previous = now
		} else if (!timeout && trailing !== false) {
			// 需要执行最后一次
			timeout = setTimeout(later, remaining)
		}
	}
	return throttled
}
