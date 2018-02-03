import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Presenter} from './components/counter/Presenter'
import {getCounterService} from './context';

export const bootstrap = () => {
  ReactDOM.render(<Presenter counterService={getCounterService()}/>, document.getElementById('app'));
}