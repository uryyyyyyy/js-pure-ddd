import "reflect-metadata";
import {container} from "./context";
import {CountRepository} from './domain/repositories';
import {CountRepositoryImpl} from './infra/CountRepositoryImpl';
import {bootstrap} from './bootstrap'
import {CounterService} from './domain/services/CounterService';
import {TYPES} from './di-types';

container.bind<CountRepository>(TYPES.CountRepository).to(CountRepositoryImpl).inSingletonScope();
container.bind<CounterService>(TYPES.CounterService).to(CounterService).inSingletonScope();

bootstrap()