import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {CounterContainer} from './components/counter/Container'
import "reflect-metadata";
import {TYPES} from './context/di-types';
import {CountSessionRepository, CountSessionRepositoryImpl} from './infra/CountSessionRepository';
import {container} from './context/context';
import {CounterViewModel, CounterViewModelImpl} from './components/counter/ViewModel';

container.bind<CountSessionRepository>(TYPES.CountSessionRepository).to(CountSessionRepositoryImpl).inSingletonScope();
container.bind<CounterViewModel>(TYPES.CounterViewModel).to(CounterViewModelImpl).inSingletonScope();

ReactDOM.render(<CounterContainer />, document.getElementById('app'));
