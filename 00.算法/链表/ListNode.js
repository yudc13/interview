function Node(val, next) {
	this.val = val
	this.next = next
}

var MyLinkedList = function() {
	this.dummyHead = new Node()
	this.size = 0
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
	let cur = this.dummyHead
	for (let i = 0; i <= index && cur; i++) {
		cur = cur.next
	}
	if (cur) {
		return cur.val
	}
	return -1
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
	this.addAtIndex(0, val)
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
	this.addAtIndex(this.size, val)
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
	if (index > this.size) {
		return
	}
	if (index < 0) {
		index = 0
	}
	let prev = this.dummyHead
	for (let i = 0; i < index; i++) {
		prev = prev.next
	}
	prev.next = new Node(val, prev.next)
	this.size += 1
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
	if (index < 0 || index >= this.size) {
		return
	}
	let prev = this.dummyHead
	let cur = this.dummyHead.next
	for (let i = 0; i < index && cur; i++) {
		prev = prev.next
		cur = cur.next
	}
	if (cur) {
		prev.next = cur.next
	}
	this.size -= 1
};

// ["MyLinkedList","addAtHead","addAtHead","addAtHead","addAtIndex","deleteAtIndex","addAtHead","addAtTail","get","addAtHead","addAtIndex","addAtHead"]
// [[],[7],[2],[1],[3,0],[2],[6],[4],[4],[4],[5,0],[6]]

const link = new MyLinkedList()
link.addAtHead(2)
link.deleteAtIndex(1)
link.addAtHead(2)
link.addAtHead(7)
link.addAtHead(3)
link.addAtHead(2)
link.addAtHead(5)
link.addAtTail(5)
console.log(link.get(5))
link.deleteAtIndex(6)
link.deleteAtIndex(4)

console.log(JSON.stringify(link, null, 2))

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
