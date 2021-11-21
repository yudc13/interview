const { tree } = require('./data')

// 广度优先遍历
function bfs(root) {
	if (!root) {
		return
	}
	// 使用一个队列来维护
	const q = [root]
	// 一次取出队列中的值
	while (q.length > 0) {
		const data = q.shift()
		console.log(data.val)
		Array.prototype.push.apply(q, data.children)
	}
}

bfs(tree)
