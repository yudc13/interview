/**
 * 循环队列 (会浪费一个空间)
 * 当 front === tail 时，标识队列为空
 * 当 (tail + 1) % length === front 时，标识队满
 */
class LoopQueue {
	constructor(cap) {
		// 队列的容量
		this.queue = new Array(cap + 1)
		// 指向队首
		this.front = 0
		// 指向队尾
		this.tail = 0
		this.size = 0
	}

	// 入队
	enqueue(el) {
		if ((this.tail + 1) % this.queue.length === this.front) {
			this.resize(this.getCap() * 2)
		}
		this.queue[this.tail] = el
		this.tail += 1
		this.size += 1
	}

	// 出队
	dequeue() {
		if (this.isEmpty()) {
			throw new Error('队列已经为空，不能再出了')
		}
		const frontVal = this.queue[this.front]
		this.front += 1
		this.size -= 1
		if (this.size === Math.floor(this.getCap() / 4) && Math.floor(this.getCap() / 2) > 0) {
			this.resize(Math.floor(this.getCap() / 2))
		}
		return frontVal
	}

	isEmpty() {
		return this.front === this.tail
	}

	getCap() {
		return this.queue.length - 1
	}

	// 扩容
	resize(newCap) {
		const newQueue = new Array(newCap)
		for (let i = 0; i < this.size; i++) {
			newQueue[i] = this.queue[(i + this.front) % this.queue.length]
		}
		this.queue = newQueue
		this.front = 0
		this.tail = this.size
	}

	getSize() {
		return this.size
	}

	toString() {
		let queue = ''
		for (let i = this.front; i !== (this.tail + 1) % this.queue.length; i = (i + 1) % this.queue.length) {
			queue += `${this.queue[i]}, `
		}
		console.log(`queue: ${queue} front: ${this.front} tail: ${this.tail} cap: ${this.getCap()} size: ${this.getSize()}`)
	}
}

const queue = new LoopQueue(6)

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.enqueue(5)
queue.enqueue(6)
queue.enqueue(7)
queue.enqueue(8)

queue.toString()

queue.dequeue()
queue.dequeue()
queue.toString()
queue.dequeue()
queue.dequeue()
queue.toString()
queue.dequeue()
queue.dequeue()
queue.toString()
queue.dequeue()
queue.dequeue()
queue.toString()
