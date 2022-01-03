const express = require('express')
const path = require('path')
const CryptoJS = require('crypto-js/crypto-js')
const fs = require('fs')

const app = express()

app.set('etag', function (body, encoding) {
	console.log(body, encoding)
	return '123'
})

const options = {
	// express采用的是弱etag
	// 'W/' （区分大小写）开头表示使用弱校验。
	etag: false,
	// 开启lastModified
	// 如果文件内容没有改变，但是更新时间变了 也会造成不必要的请求
	lastModified: false,
	setHeaders: (res, path) => {
		console.log('path: ', path)
		const data = fs.readFileSync(path, 'utf-8') // 读取文件
		const hash = CryptoJS.MD5(JSON.stringify(data)) // MD5加密
		res.set('Cache-Control', 'max-age=10')
		// res.set('ETag', hash)
	},
}

app.use(express.static(path.resolve(__dirname, 'public'), options))

app.listen(3000)
