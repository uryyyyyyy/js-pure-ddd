import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Presenter} from './components/counter/Presenter'
import 'reflect-metadata'
import {CounterService} from './services/CounterService';
import {CountRepository} from './repositories/CountRepository';
import {Count} from './entities/Count';

ReactDOM.render(<Presenter counterService={new CounterService(new CountRepository(new Count(0)))}/>, document.getElementById('app'));