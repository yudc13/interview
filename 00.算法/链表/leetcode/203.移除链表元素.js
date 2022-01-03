function removeElements(head, val) {
	// 1. 考虑删除头节点的情况
	while (head && head.value === val) {
		head = head.next
	}
	// 2. 可以设置一个虚拟的头节点
	// 删除非头节点
	let current = head
	while (current && current.next) {
		if (current.next.value === val) {
			// 删除节点
			current.next = current.next.next
		} else {
			current = current.next
		}
	}
	return head
}

module.exports = removeElements
