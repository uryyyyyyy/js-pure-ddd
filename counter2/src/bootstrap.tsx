import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Presenter} from './components/counter/Presenter'
import {CounterService} from './domain/services/CounterService';
import {AppContext} from './context';

export const bootstrap = (context: AppContext) => {
  ReactDOM.render(<Presenter counterService={new CounterService(context.countRepository)}/>, document.getElementById('app'));
}