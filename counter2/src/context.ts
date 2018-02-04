import "reflect-metadata";
import { Container } from "inversify";
import {TYPES} from './di-types';
import {CounterViewModel} from './components/counter/ViewModel';

export const container = new Container();

export const getCounterViewModel = () => container.get<CounterViewModel>(TYPES.CounterViewModel);
