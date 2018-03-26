import {Count} from '../entities/Count';

export type Fail = {err: Error}

export interface CountPersistRepository {
  saveCount(count: Count): Promise<void | Fail>
  fetchCount(): Promise<Count>
}

export function isFail<T>(result: T | Fail): result is Fail {
  if(result === undefined) {
    return false // Tがvoidなこともある
  }
  return (<Fail>result).err !== undefined;
}