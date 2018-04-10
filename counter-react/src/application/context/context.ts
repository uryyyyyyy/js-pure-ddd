import "reflect-metadata";
import { Container } from "inversify";
import {TYPES} from './di-types';
import {CountSessionRepository} from "../../domain/repository/CountSessionRepository";
import {CountPersistRepository} from "../../domain/repository/CountPersistRepository";

export const container = new Container();

export const getCountSessionRepository = () => container.get<CountSessionRepository>(TYPES.CountSessionRepository);
export const getCountPersistRepository = () => container.get<CountPersistRepository>(TYPES.CountPersistRepository);