import "reflect-metadata";
import { Container } from "inversify";
import {CountRepository} from './domain/repositories';
import {CounterService} from './domain/services/CounterService';

export const TYPES = {
  CountRepository: Symbol.for("CountRepository")
};

export const container = new Container();

export const getCountRepository = () => container.get<CountRepository>(TYPES.CountRepository);
export const getCounterService = () => new CounterService(getCountRepository())