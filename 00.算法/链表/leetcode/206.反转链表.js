const head = require('../ListNode')

function reverseList(head) {
	let pre = null
	let cur = head
	while (cur) {
		let next = cur.next
		cur.next = pre
		pre = cur
		cur = next
	}
	return pre
}

const result = reverseList(head)

console.log(JSON.stringify(result, null, 2))
