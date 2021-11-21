const { tree } = require('./data')

// 深度优先遍历
function dfs(root) {
	if (!root) {
		return
	}
	// 1. 先访问根节点
	console.log(root.val)
	// 2. 递归遍历children
	root.children.forEach(dfs)
}

dfs(tree)
