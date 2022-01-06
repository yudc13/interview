// class LinkedNode {
// 	constructor(val) {
// 		this.val = val
// 		this.next = null
// 	}
// }
// class LinkedList {
// 	constructor() {
// 		// 虚拟头节点
// 		this.dummyHead = new LinkedNode(0)
// 		// 链表长度
// 		this.size = 0
// 	}

// 	/**
// 	 * 获取链表中第index个节点的值
// 	 * 索引无效返回-1
// 	 * @param {*} index
// 	 */
// 	get(index) {
// 		if (index < 0 || index > this.size) {
// 			return -1
// 		}
// 		let head = this.dummyHead.next
// 		while (index >= 0) {
// 			head = head.next
// 			index -= 1
// 		}
// 		return head.val
// 	}
// 	/**
// 	 * 在链表的第一个元素之前添加一个值为val的节点
// 	 * @param {*} val
// 	 */
// 	addAtHead(val) {
// 		const node = new LinkedNode(val)
// 		node.next = this.dummyHead.next
// 		this.dummyHead.next = node
// 		this.size += 1
// 	}
// 	/**
// 	 * 将值为val的节点追加到链表的最后一个
// 	 * @param {*} val
// 	 */
// 	addAtTail(val) {
// 		const node = new LinkedNode(val)
// 		let head = this.dummyHead
// 		while (head.next) {
// 			head = head.next
// 		}
// 		head.next = node
// 		this.size += 1
// 	}
// 	/**
// 	 * 在链表中的第index个节点之前添加一个值为val的节点
// 	 * index等于链表长度，则添加到末尾
// 	 * index大于链表的长度，则不添加
// 	 * index小于0，则添加到头部
// 	 * @param {*} index
// 	 * @param {*} val
// 	 */
// 	addAtIndex(index, val) {
// 		if (index === this.size) {
// 			this.addAtTail(val)
// 		} else if (index <= 0) {
// 			this.addAtHead(val)
// 		} else if (index > 0 && index < this.size) {
// 			let head = this.dummyHead
// 			while (index--) {
// 				head = head.next
// 			}
// 			const node = new LinkedNode(val)
// 			node.next = head.next
// 			head.next = node
// 			this.size += 1
// 		}
// 	}
// 	/**
// 	 * 删除链表中第index个节点
// 	 * @param {*} index
// 	 */
// 	deleteAtIndex(index) {
// 		if (index < 0 || index > this.size - 1) {
// 			return
// 		}
// 		let head = this.dummyHead
// 		while (index--) {
// 			head = head.next
// 		}
// 		head.next = head.next.next
// 		this.size -= 1
// 	}
// }

var MyLinkedNode = function (val) {
	this.val = val
	this.next = null
}
var MyLinkedList = function () {
	this.dummyHead = new MyLinkedNode(0)
	this.size = 0
}

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
	if (index < 0 || index > this.size - 1) {
		return -1
	}
	let cur = this.dummyHead.next
	while (index > 0) {
		cur = cur.next
		index -= 1
	}
	return cur.val
}

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
	const node = new MyLinkedNode(val)
	const cur = this.dummyHead
	node.next = cur.next
	cur.next = node
	this.size += 1
}

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
	const node = new MyLinkedNode(val)
	let cur = this.dummyHead
	while (cur.next) {
		cur = cur.next
	}
	cur.next = node
	this.size += 1
}

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
	if (index > this.size) {
		return
	}
	const node = new MyLinkedNode(val)
	let cur = this.dummyHead
	while (index--) {
		cur = cur.next
	}
	node.next = cur.next
	cur.next = node
	this.size += 1
}

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
	if (index < 0 || index > this.size - 1) {
		return
	}
	let cur = this.dummyHead
	while (index--) {
		cur = cur.next
	}
	cur.next = cur.next.next
	this.size -= 1
}

const linkedLink = new MyLinkedList()
linkedLink.addAtHead(7)
linkedLink.addAtHead(2)
linkedLink.addAtHead(1)
linkedLink.addAtIndex(3, 0)
console.log(JSON.stringify(linkedLink.dummyHead.next, null, 2))

linkedLink.deleteAtIndex(2)
console.log(JSON.stringify(linkedLink.dummyHead.next, null, 2))
linkedLink.addAtHead(6)
linkedLink.addAtTail(4)
console.log(linkedLink.get(4))


console.log(JSON.stringify(linkedLink.dummyHead.next, null, 2))
