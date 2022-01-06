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
const nodeD = new ListNode('D')
const nodeE = new ListNode('E')

head.insert('A', nodeB)
// head.insert('B', nodeC)
// head.insert('C', nodeD)
// head.insert('D', nodeE)
nodeB.next = head

module.exports = head
