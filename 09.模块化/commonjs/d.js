let message = require('./e.js').message


module.exports.count = 5

setTimeout(() => {
  console.log('d.js ', message)
}, 0)