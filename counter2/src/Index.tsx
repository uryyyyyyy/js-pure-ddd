import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Presenter} from './components/counter/Presenter'
import 'reflect-metadata'
import {CounterService} from './components/services/CounterService';

ReactDOM.render(<Presenter counterService={new CounterService(0)}/>, document.getElementById('app'));