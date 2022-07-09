/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function(s) {
	if (s.length % 2 !== 0) {
		return false
	}
	const mapper = {
		'(': ')',
		'{': '}',
		'[': ']'
	}
	const stack = []
	for (let i = 0; i < s.length; i++) {
		const target = mapper[s.charAt(i)]
		// 左括号
		if (target) {
			stack.push(s.charAt(i))
		} else {
			// 取出栈顶元素
			const top = stack[stack.length - 1]
			console.log(top, s.charAt(i))
			if (mapper[top] === s.charAt(i)) {
				stack.pop()
			} else {
				return false
			}
		}
	}
	return stack.length === 0
};

isValid("([}}])")
