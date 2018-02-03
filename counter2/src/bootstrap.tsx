import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Presenter} from './components/counter/Presenter'

export const bootstrap = () => {
  ReactDOM.render(<Presenter />, document.getElementById('app'));
}