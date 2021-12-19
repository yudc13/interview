const express = require('express')

const app = express()

let whiteList = ['http://localhost:3000']

app.use((req, res, next) => {
	// origin字段表示是哪个服务在访问我
	const { origin } = req.headers
	console.log(req.headers)
	if (whiteList.includes(origin)) {
		// 设置请求头
		// 设置允许哪些请求源
		res.setHeader('Access-Control-Allow-Origin', origin)
		// 设置允许的请求方式
		res.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE')
		res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header')
		// 设置哪些请求头可以作为响应的一部分
		res.setHeader('Access-Control-Expose-Headers', 'token')
		// 设置允许携带凭证 此时请求头中就会包含凭证信息-cookie
		res.setHeader('Access-Control-Allow-Credentials', true)
		// 设置与预检请求的有效时间
		res.setHeader('Access-Control-Max-Age', 10)
	}
	next()
})

app.get('/getData', (req, res) => {
	res.end('get: 恭喜你🎉')
})

app.post('/getData', (req, res) => {
	res.end('post: 恭喜你🎉')
})

app.put('/getData', (req, res) => {
	res.end('put: 恭喜你🎉')
})

app.delete('/getData', (req, res) => {
	res.setHeader('token', '123')
	res.end('delete: 恭喜你🎉')
})

app.listen(4000)
