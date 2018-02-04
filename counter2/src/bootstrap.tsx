import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {CounterContainer} from './components/counter/Container'

export const bootstrap = () => {
  ReactDOM.render(<CounterContainer />, document.getElementById('app'));
}