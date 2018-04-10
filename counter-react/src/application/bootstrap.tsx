import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {CounterContainer} from './components/counter/Container'
import "reflect-metadata";
import {TYPES} from './context/di-types';
import {CountSessionRepositoryImpl} from './infra/CountSessionRepository';
import {container} from './context/context';
import {CounterViewModel, CounterViewModelImpl} from './components/counter/ViewModel';
import {CountSessionRepository} from '../domain/repository/CountSessionRepository';
import {CountPersistRepository} from '../domain/repository/CountPersistRepository';
//import {CountPersistRepositoryLS} from './infra/CountPersistRepositoryLS';
import {CountPersistRepositoryServer} from './infra/CountPersistRepositoryServer';

container.bind<CountSessionRepository>(TYPES.CountSessionRepository).to(CountSessionRepositoryImpl).inSingletonScope();
//container.bind<CountPersistRepository>(TYPES.CountPersistRepository).to(CountPersistRepositoryLS).inSingletonScope();
container.bind<CountPersistRepository>(TYPES.CountPersistRepository).to(CountPersistRepositoryServer).inSingletonScope();
container.bind<CounterViewModel>(TYPES.CounterViewModel).to(CounterViewModelImpl);

ReactDOM.render(<>
    <CounterContainer />
    <p> </p>
    <p> </p>
    <p> </p>
    <CounterContainer />
  </>, document.getElementById('app'));
