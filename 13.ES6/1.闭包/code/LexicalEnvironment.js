class LexicalEnvironment {
	constructor(environmentRecords, outer) {
		this.environmentRecords = environmentRecords
		this.outer = outer
	}
}

module.exports = LexicalEnvironment
