const foo = {
	fn: function () {
		setTimeout(function () {
			console.log(this)
		})
	},
}

foo.fn() // global

const bar = {
	fn: function () {
		setTimeout(() => {
			console.log(this)
		})
	},
}

console.log(bar.fn()) // { fn: [Function: fn] }
