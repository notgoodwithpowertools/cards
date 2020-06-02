import React from 'react'
import ReactDOM from 'react-dom'

	
// import './fonts/ubuntu/Ubuntu-Medium.ttf'
import './css/Lato.css'
import './index.css'
import AppRouter from './components/AppRouter.jsx'
import * as serviceWorker from './serviceWorker'


console.log("Launching ... +++++++++++++++++++++++ ...")

ReactDOM.render(<AppRouter />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
