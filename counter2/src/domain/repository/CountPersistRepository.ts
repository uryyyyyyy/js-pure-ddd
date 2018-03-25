import {Count} from '../entities/Count';

export interface CountPersistRepository {
  saveCount(count: Count): Promise<void>
  fetchCount(): Promise<Count>
}