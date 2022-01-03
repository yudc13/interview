const removeElements = require('./leetcode/203.移除链表元素')

class ListNode {
	constructor(value) {
		// 节点上存储的元素
		this.value = value
		// 节点的下一个指针
		this.next = null
	}

	// 添加节点
	insert(target, node) {
		let head = this
		let current
		while (head) {
			if (head.value === target) {
				current = head
			}
			head = head.next
		}
		node.next = current.next
		current.next = node
	}

	// 删除节点
	remove(val) {
		// 头节点
		let head = this
		let target
		// 找到需要删除节点的上一个节点
		while (head.next) {
			if (head.next.value === val) {
				target = head
			}
			head = head.next
		}
		if (target) {
			target.next = target.next.next
		}
	}
}

const head = new ListNode('A')
const nodeB = new ListNode('B')
const nodeC = new ListNode('C')
const nodeB2 = new ListNode('B')
const nodeE = new ListNode('E')

head.next = nodeB
nodeB.next = nodeC
nodeC.next = nodeB2
nodeB2.next = nodeE


const a = removeElements(head, 'A')

console.log(JSON.stringify(a, null, 2))


module.exports = head
