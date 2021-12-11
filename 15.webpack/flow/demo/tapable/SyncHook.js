const Hook = require('./Hook')
const HookCodeFactory = require('./HookCodeFactory')

class SyncHookCodeFactory extends HookCodeFactory {
	callTapSeries({ onDone }) {
		let code = ''
		let current = onDone
		let len = this.options.taps.length
		for (let i = len - 1; i >= 0; i--) {
			code = this.callTap(i, { onDone: current })
			current = () => code
		}
		return code
	}
	callTap(tapIndex, { onDone }) {
		let code = `
      var _fn${tapIndex} = _x[${tapIndex}]
      _fn${tapIndex}(${this.args()})
    `
		if (onDone) {
			code += onDone()
		}
		return code
	}
	content({ onDone }) {
		return this.callTapSeries({ onDone })
	}
}

const syncHookCodeFactory = new SyncHookCodeFactory()

class SyncHook extends Hook {
	compile(options) {
		syncHookCodeFactory.setup(this, options)
		return syncHookCodeFactory.create(options)
	}
}

module.exports = SyncHook
