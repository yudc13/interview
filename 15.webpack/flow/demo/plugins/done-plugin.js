class DonePlugin {
	constructor(options) {
		this.options = options
	}
	apply(complier) {
		complier.hooks.done.tap('DonePlugin', (stats) => {
			console.log('Done...')
		})
	}
}

module.exports = DonePlugin
