const { bTree } = require('./data')

// 中序遍历 - 左·中·右
function inOrder(root) {
	if (!root) {
		return
	}
	// 1. 递归遍历左子树
	inOrder(root.left)
	// 2. 访问根节点
	console.log(root.val)
	// 3. 递归遍历右子树
	inOrder(root.right)
}

inOrder(bTree)
