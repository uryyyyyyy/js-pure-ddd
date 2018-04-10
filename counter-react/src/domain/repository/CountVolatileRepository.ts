import {Count} from '../entities/Count';
import {SessionRepository} from './SessionRepository';

export interface CountVolatileRepository extends SessionRepository<Count> {
  increment(num: number): void
  decrement(num: number): void
  update(count: Count): void
}