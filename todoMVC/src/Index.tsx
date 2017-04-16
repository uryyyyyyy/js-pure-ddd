import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './views/App'
import todoListService from './services/TodoListService'

ReactDOM.render(
  <App todoListService={todoListService}/>
  , document.getElementById("app")
)
