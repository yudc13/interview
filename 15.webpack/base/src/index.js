import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

ReactDOM.render(<h1>Hello, {_.join([1, 2, 3])}</h1>, document.getElementById('root'))
