import { Count } from '../entities/Count'
import { Observable } from 'rxjs'
import {VolatileRepository} from './VolatileRepository';

export abstract class CountVolatileRepository implements VolatileRepository<Count> {
  increment: (num: number) => void
  decrement: (num: number) => void
  update: (count: Count) => void

  getState: () => Count

  getStateObservable: () => Observable<Count>
}
