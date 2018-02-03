import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import {Count} from '../entities/Count'

export class CountRepository {

  private count: BehaviorSubject<Count>

  constructor(count: Count) {
    this.count = new BehaviorSubject(count)
  }

  /**
   * save to storage
   */
  save(count: Count): void {
    this.count.next(count)
  }

  /**
   * get current count
   */
  getCount(): Count {
    return this.count.value
  }

  /**
   * get count observable
   */
  getCountObservable(): Observable<Count> {
    return this.count
  }
}
