const { bTree } = require('./data')

// 先序遍历 - 根·左·右
function preOrder(root) {
	if (!root) {
		return
	}
	// 1. 先访问根节点
	console.log(root.val)
	// 2. 递归访问左子树
	preOrder(root.left)
	// 3. 递归遍历右子树
	preOrder(root.right)
}

preOrder(bTree)
