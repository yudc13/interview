const head = require('../ListNode')

function detectCycle(head) {
	let fast = head
	let slow = head
	while (slow && fast && fast.next) {
		fast = fast.next.next
		slow = slow.next
		// 有环
		if (fast === slow) {
			slow = head
			while (slow !== fast) {
				slow = slow.next
				fast = fast.next
			}
			return slow
		}
	}
	return null
}

detectCycle(head)
