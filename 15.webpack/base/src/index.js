import './styles.css'
import './styles.less'
console.log(1)

const user = require('../assets/th.jpg')

const img = new Image()
img.src = user.default
document.body.appendChild(img)
