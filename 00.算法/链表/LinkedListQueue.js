/**
 * 使用链表实现队
 */
class LinkedNode {
	constructor(val, next) {
		this.val = val
		this.next = next
	}
}
class LinkedListQueue {
	constructor() {
		// 队头
		this.head = null
		// 队尾
		this.tail = null
		this.size = 0
	}

	getSize() {
		return this.size
	}

	isEmpty() {
		return this.size === 0
	}

	// 入队
	enqueue(val) {
		const node = new LinkedNode(val, null)
		if (!this.tail) {
			this.tail = node
			this.head = node
		} else {
			this.tail.next = node
			// 尾指针往后移
			this.tail = this.tail.next
		}
		this.size += 1
	}

	// 出队
	dequeue() {
		if (this.isEmpty()) {
			throw new Error('queue is empty')
		}
		const retNode = this.head
		this.head = this.head.next
		if (!this.head) {
			this.tail = null
		}
		this.size -= 1
		retNode.next = null
		return retNode.val
	}

	toString() {
		let cur = this.head
		let res = ''
		for (let i = 0; i < this.size && cur; i++) {
			res += `${cur.val}->`
			cur = cur.next
		}
		res += 'NULL'
		console.log(res)
	}
}

const queue = new LinkedListQueue()
queue.enqueue(1)
queue.dequeue()
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.enqueue(5)
queue.dequeue()
queue.toString()
