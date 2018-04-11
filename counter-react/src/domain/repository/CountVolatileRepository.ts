import {Count} from '../entities/Count';
import {VolatileRepository} from './VolatileRepository';

export interface CountVolatileRepository extends VolatileRepository<Count> {
  increment(num: number): void
  decrement(num: number): void
  update(count: Count): void
}