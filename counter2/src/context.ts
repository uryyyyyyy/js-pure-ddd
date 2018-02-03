import {CountRepository} from './domain/repositories';

export const TYPES = {
  CountRepository: Symbol.for("CountRepository")
};

export interface AppContext {
  countRepository: CountRepository
}