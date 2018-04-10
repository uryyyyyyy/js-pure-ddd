import { Count } from '../entities/Count'
import { VolatileRepository } from './VolatileRepository'
import { Observable } from 'rxjs'

export class CountVolatileRepository implements VolatileRepository<Count> {
  increment(num: number): void {
    return num as any
  }
  decrement(num: number): void {
    return num as any
  }
  update(count: Count): void {
    return count as any
  }

  getState(): Count {
    return null as any
  }

  getStateObservable(): Observable<Count> {
    return null as any
  }
}
