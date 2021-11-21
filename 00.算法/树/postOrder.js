const { bTree } = require('./data')

// 后序遍历 - 左·中·右

function postOrder(root) {
	if (!root) {
		return
	}
  postOrder(root.left)
  postOrder(root.right)
  console.log(root.val)
}

postOrder(bTree)
