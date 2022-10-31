const foo = {
	name: 'Lucas',
	logName: function () {
		console.log(this.name)
	},
}

const bar = {
  name: 'mike'
}

foo.logName.call(bar)
