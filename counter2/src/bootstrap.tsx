import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Counter from './components/counter/Presenter'

export const bootstrap = () => {
  ReactDOM.render(<Counter />, document.getElementById('app'));
}