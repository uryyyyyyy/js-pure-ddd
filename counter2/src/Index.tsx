import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Presenter} from './components/counter/Presenter'
import 'reflect-metadata'
import {CounterService} from './components/services/CounterService';
import {CountRepository} from './components/repositories/CountRepository';

ReactDOM.render(<Presenter counterService={new CounterService(new CountRepository(0))}/>, document.getElementById('app'));