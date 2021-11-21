const tree = {
	val: 1,
	children: [
		{
			val: 2,
			children: [
				{
					val: 4,
					children: [
						{
							val: 5,
							children: [],
						},
					],
				},
				{
					val: 6,
					children: [],
				},
			],
		},
		{
			val: 3,
			children: [
				{
					val: 7,
					children: [],
				},
				{
					val: 8,
					children: [],
				},
			],
		},
	],
}

const bTree = {
	val: 1,
	left: {
		val: 2,
		left: {
			val: 4,
			left: {
				val: 8,
				left: null,
				right: null,
			},
			right: {
				val: 9,
				left: null,
				right: null,
			},
		},
		right: {
			val: 5,
			left: null,
			right: null,
		},
	},
	right: {
		val: 3,
		left: {
			val: 6,
			left: null,
			right: null,
		},
		right: {
			val: 7,
			left: null,
			right: null,
		},
	},
}

module.exports = {
	tree,
	bTree,
}
