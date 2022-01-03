const head = require('./ListNode')

head.remove('B')
head.insert('C', new ListNode('F'))

console.log(JSON.stringify(head, null, 2))
