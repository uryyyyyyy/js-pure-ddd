import "reflect-metadata";
import {container, TYPES} from "./context";
import {CountRepository} from './domain/repositories';
import {CountRepositoryImpl} from './infra/CountRepositoryImpl';
import {bootstrap} from './bootstrap'

container.bind<CountRepository>(TYPES.CountRepository).to(CountRepositoryImpl).inSingletonScope();

bootstrap()