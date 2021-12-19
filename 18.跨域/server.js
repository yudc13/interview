const express = require('express')

const app = express()

app.get('/say', (req, res) => {
	const { name, cb } = req.query
	res.end(`${cb}('hello ${name}')`)
})

app.listen(3000)
