const mkdirp = require("mkdirp");
const fs = require("fs");
const path = require('path')

exports.saveFile = function (filePath, content, cb) {
	mkdirp(path.resolve(filePath, '..'), {})
		.then(() => {
			fs.writeFile(filePath, content, cb)
		})
		.catch(cb)
}
