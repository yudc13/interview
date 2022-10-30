/**
 * 利用回调实现异步控制流模式
 */
const fs = require("fs");
const superagent = require("superagent")
const path = require("path");
const {saveFile} = require("./saveFile");

module.exports = function (url, cb) {
	let filename = 'text.txt'
	const dir = path.resolve(__dirname, 'res')
	fs.access(path.resolve(dir, filename), err => {
		if (err && err.code === 'ENOENT') {
			superagent.get(url).end((err, res) => {
				if (err) {
					cb(err)
				} else {
					saveFile(path.resolve(dir, filename), res.text, (err) => {
						if (err) {
							cb(err)
						} else {
							cb(null, filename, true)
						}
					})
				}
			})
		} else {
			cb(null, filename, false)
		}
	})
}
