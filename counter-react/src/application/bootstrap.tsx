import * as React from 'react'
import * as ReactDOM from 'react-dom'
import "reflect-metadata";
import {TYPES} from './context/di-types';
import {CountVolatileRepositoryImpl} from './infra/CountSessionRepository';
import {container} from './context/context';
import {CountVolatileRepository} from '../domain/repository/CountVolatileRepository';
import {CountPersistRepository} from '../domain/repository/CountPersistRepository';
//import {CountPersistRepositoryLS} from './infra/CountPersistRepositoryLS';
import {CountPersistRepositoryServer} from './infra/CountPersistRepositoryServer';
import {CounterContainer} from "./components/counter/View";

container.bind<CountVolatileRepository>(TYPES.CountVolatileRepository).to(CountVolatileRepositoryImpl).inSingletonScope();
//container.bind<CountPersistRepository>(TYPES.CountPersistRepository).to(CountPersistRepositoryLS).inSingletonScope();
container.bind<CountPersistRepository>(TYPES.CountPersistRepository).to(CountPersistRepositoryServer).inSingletonScope();

ReactDOM.render(<CounterContainer />,
  document.getElementById('app'));