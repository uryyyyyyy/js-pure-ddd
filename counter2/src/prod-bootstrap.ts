import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./context";
import {CountRepository} from './domain/repositories';
import {CountRepositoryImpl} from './infra/CountRepositoryImpl';
import {bootstrap} from './bootstrap'

const myContainer = new Container();
myContainer.bind<CountRepository>(TYPES.CountRepository).to(CountRepositoryImpl);

const countRepository = myContainer.get<CountRepository>(TYPES.CountRepository);

bootstrap({countRepository})