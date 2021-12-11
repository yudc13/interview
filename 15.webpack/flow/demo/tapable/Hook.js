// call的代理方法
const CALL_DELEGATE = function (...args) {
	this.call = this._createCall('sync')
	return this.call(...args)
}
class Hook {
	constructor(args) {
		if (!Array.isArray(args)) {
			args = []
		}
		this._args = args // 参数
		// 存放回调的数组
		this.taps = []
		this.call = CALL_DELEGATE
	}
	tap(options, fn) {
		this._tap('sync', options, fn)
	}
	_tap(type, options, fn) {
		if (typeof options === 'string') {
			options = { name: options, type: 'sync', fn }
		} else {
			options = { ...options, type: 'sync', fn }
		}
		this._insert(options)
	}
	_insert(item) {
		// 重置call
		this.call = CALL_DELEGATE
		this.taps.push(item)
	}
	_createCall(type) {
		return this.compile({
			taps: this.taps,
			args: this._args,
			type,
		})
	}
}

module.exports = Hook
