class Update {
	constructor(payload, nextUpdate) {
		this.payload = payload
		this.nextUpdate = nextUpdate
	}
}

class UpdateQueue {
	constructor() {
		this.baseState = null
		this.firstUpdate = null
		this.lastUpdate = null
	}
	enqueueUpdate(update) {
		if (!this.firstUpdate) {
			this.firstUpdate = this.lastUpdate = update
		} else {
			this.lastUpdate.nextUpdate = update
			this.lastUpdate = update
		}
	}
	forceUpdate() {
		let currentState = this.baseState || {}
		let nextState = this.firstUpdate
		while (nextState) {
			let nextState =
				typeof nextState.payload === 'function'
					? nextState.payload(currentState)
					: nextState.payload
			currentState = { ...currentState, ...nextState }
			nextState = nextState.nextUpdate
		}
		this.firstUpdate = this.lastUpdate = null
		this.baseState = currentState
		return currentState
	}
}

let queue = new UpdateQueue()
debugger
queue.enqueueUpdate(new Update({ name: 'xm' }))
queue.enqueueUpdate(new Update({ number: 1 }))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
queue.forceUpdate()
