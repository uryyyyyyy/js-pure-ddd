import "reflect-metadata";
import { Container } from "inversify";
import {CountRepository} from './domain/repositories';
import {CounterService} from './domain/services/CounterService';
import {TYPES} from './di-types';

export const container = new Container();

export const getCountRepository = () => container.get<CountRepository>(TYPES.CountRepository);
export const getCounterService = () => container.get<CounterService>(TYPES.CounterService);