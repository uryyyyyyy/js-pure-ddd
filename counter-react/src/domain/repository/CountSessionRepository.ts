import {Count} from '../entities/Count';
import {SessionRepository} from './SessionRepository';

export interface CountSessionRepository extends SessionRepository<Count> {
  increment(num: number): void
  decrement(num: number): void
  update(count: Count): void
}