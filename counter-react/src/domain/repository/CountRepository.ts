import {Count} from '../entities/Count'
import {RepositoryBase} from './RepositoryBase';

export interface Fail {
  err: Error
}

export interface CountRepository extends RepositoryBase<Count> {
  saveCount(count: Count): Promise<void | Fail>
  fetchCount(): Promise<Count>
}

export function isFail<T>(result: T | Fail): result is Fail {
  if (result === undefined) {
    return false // Tがvoidなこともある
  }
  return (result as Fail).err !== undefined
}
