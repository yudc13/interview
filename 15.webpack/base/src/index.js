import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import('./utils') // 这里会产生一个chunk
import user from './images/user.png'

import './styles.css'
console.log(process.env.NODE_ENV)
ReactDOM.render(
	<div>
		<h1>Hello, {_.join([1, 2, 3])}</h1>
		<img src={user} alt='user' />
	</div>,
	document.getElementById('root')
)
