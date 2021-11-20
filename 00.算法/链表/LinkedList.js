class Node {
  constructor (value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor (value) {
    this.head = new Node(value)
  }
  find (value) {
    let current = this.head
    while (current && current.value !== value) {
      current = current.next
    }
    return current
  }
  append (value) {
    const node = new Node(value)
    let current = this.head
    while (current && current.next) {
      current = current.next
    }
    current.next = node
  }
}

const linkedList = new LinkedList(0)
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
linkedList.append(4)

// 删除链表元素
function deleteNode (node) {
  node.value = node.next.value
  node.next = node.next.next
}

// 链表反转
function reverseLinkedList (head) {
  let cur = head
  let pre = null
  while (cur) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}

// deleteNode(linkedList.find('b'))

const res = reverseLinkedList(linkedList)

console.log(JSON.stringify(res, null, 2))