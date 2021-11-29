require('./style.less')
let logo = require('./images/user.png')

const img = new Image()
img.src = logo

document.body.appendChild(img)
