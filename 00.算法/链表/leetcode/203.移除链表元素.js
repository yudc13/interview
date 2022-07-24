function removeElements2(head, val) {
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

const removeElements = function(head, val) {
	if (head === null) {
		return null
	}
	const res = removeElements(head.next, val)
	if (head.val === val) {
		return res
	} else {
		head.next = res
		return head
	}
};

const head = {
	val: 1,
	next: {
		val: 2,
		next: {
			val: 6,
			next: {
				val: 3,
				next: {
					val: 4,
					next: {
						val: 5,
						next: {
							val: 6,
							next: null
						}
					}
				}
			}
		}
	}
}

removeElements(head, 6)
