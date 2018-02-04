import "reflect-metadata";
import {container} from "./context";
import {CountRepository} from './domain/repositories';
import {CountRepositoryImpl} from './infra/CountRepositoryImpl';
import {bootstrap} from './bootstrap'
import {CounterService} from './domain/services/CounterService';
import {TYPES} from './di-types';
import {CounterViewModel} from './components/counter/ViewModel';

container.bind<CountRepository>(TYPES.CountRepository).to(CountRepositoryImpl).inSingletonScope();
container.bind<CounterService>(TYPES.CounterService).to(CounterService).inSingletonScope();
container.bind<CounterViewModel>(TYPES.CounterViewModel).to(CounterViewModel).inSingletonScope();

bootstrap()