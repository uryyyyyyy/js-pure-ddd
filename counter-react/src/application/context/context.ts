import "reflect-metadata";
import { Container } from "inversify";
import {TYPES} from './di-types';
import {CountVolatileRepository} from "../../domain/repository/CountVolatileRepository";
import {CountPersistRepository} from "../../domain/repository/CountPersistRepository";

export const container = new Container();

export const getCountSessionRepository = () => container.get<CountVolatileRepository>(TYPES.CountVolatileRepository);
export const getCountPersistRepository = () => container.get<CountPersistRepository>(TYPES.CountPersistRepository);
