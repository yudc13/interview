/**
 * Fiber是一种树结构
 * React使用链表实现的
 */
let root = {
	key: 'A1',
	children: [
		{
			key: 'B1',
			children: [
				{
					key: 'C1',
					children: [],
				},
				{
					key: 'C2',
					children: [],
				},
			],
		},
		{
			key: 'B2',
			children: [],
		},
	],
}

function walk(element) {
	doWork(element)
	root.children.forEach(walk)
}

function doWork(element) {
	console.log(element.key)
}

// walk(root)

// -------------------

let A1 = { type: 'div', key: 'A1' }
let B1 = { type: 'div', key: 'B1', return: A1 }
let B2 = { type: 'div', key: 'B2', return: A1 }
let C1 = { type: 'div', key: 'C1', return: B1 }
let C2 = { type: 'div', key: 'C2', return: B1 }

A1.child = B1
B1.sibling = B2
B1.child = C1
C1.sibling = C2

let nextUnitOfWork = A1 // 下一个执行单元

function workLoop() {
	while (nextUnitOfWork) {
		// 开始执行 并返回下一个待执行的单元
		nextUnitOfWork = preformUnitOfWork(nextUnitOfWork)
	}
	if (!nextUnitOfWork) {
		console.log('render阶段结束')
	}
}

function preformUnitOfWork(fiber) {
	beginUnitWork(fiber)
	if (fiber.child) {
		return fiber.child
	}
	// 当前fiber没有child
	// 开始执行兄弟节点
	while (fiber) {
		completeUnitWork(fiber)
		if (fiber.sibling) {
			return fiber.sibling
		}
		// 所有兄弟节点都执行完了
		fiber = fiber.return
	}
}

function completeUnitWork(fiber) {
	console.log('结束：', fiber.key)
}

function beginUnitWork(fiber) {
	console.log('开始：', fiber.key)
}

workLoop()
