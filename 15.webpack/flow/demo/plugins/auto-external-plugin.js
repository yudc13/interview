class AutoExternalPlugin {
	constructor(options) {
		this.options = options
		this.importModules = new Set()
	}
	apply(compiler) {}
}

module.exports = AutoExternalPlugin
