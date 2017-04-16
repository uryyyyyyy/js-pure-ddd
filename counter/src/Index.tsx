import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './views/App'
import counterService from './services/CounterService'

ReactDOM.render(
  <App counterService={counterService} />
  , document.getElementById("app")
)
