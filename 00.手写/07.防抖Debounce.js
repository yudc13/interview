/**
 * 防抖
 * @param {*} fn
 * @param {*} wait
 * @param {*} immediate 第一次是否立即执行
 */
function debounce(fn, wait, immediate) {
	let timer
	return function () {
		if (timer) {
			clearTimeout(timer)
		}
		// 第一次是否执行
		if (immediate) {
			// 没有timer表示是第一次
			let callNow = !timer
			if (callNow) {
				fn.apply(this, arguments)
			}
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments)
			timer = null
		}, wait)
	}
}
