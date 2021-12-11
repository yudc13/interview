class HookCodeFactory {
	constructor() {
		this.options = null
		this._args = []
	}
	setup(hookInstance, options) {
		hookInstance._x = options.taps.map((tap) => tap.fn) // 拿到tap注册的所有回调函数
	}
	init(options) {
		this.options = options
		this._args = options.args
	}
	deinit() {
		this.options = null
		this._args = []
	}
	args() {
		return this._args.join(',')
	}
	header() {
		return 'var _x = this._x;\n'
	}
	create(options) {
		this.init(options)
		let fn
		switch (this.options.type) {
			case 'sync':
				fn = new Function(this.args(), this.header() + this.content({ onDone: () => '' }))
				return fn
			default:
				break
		}
		this.deinit(options)
	}
}

module.exports = HookCodeFactory
