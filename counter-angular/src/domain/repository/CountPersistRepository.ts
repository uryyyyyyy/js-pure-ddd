import { Count } from '../entities/Count'

export interface Fail {
  err: Error
}

export class CountPersistRepository {
  saveCount(count: Count): Promise<void | Fail> {
    return count as any
  }
  fetchCount(): Promise<Count> {
    return null as any
  }
}

export function isFail<T>(result: T | Fail): result is Fail {
  if (result === undefined) {
    return false // Tがvoidなこともある
  }
  return (result as Fail).err !== undefined
}
