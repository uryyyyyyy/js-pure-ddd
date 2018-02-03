import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'

export class CountRepository {

  private count: BehaviorSubject<number>

  constructor(amount: number) {
    this.count = new BehaviorSubject(amount)
  }

  /**
   * save to storage
   */
  save(amount: number): void {
    this.count.next(amount)
  }

  /**
   * get current count
   */
  getCount(): number {
    return this.count.value
  }

  /**
   * get count observable
   */
  getCountObservable(): Observable<number> {
    return this.count
  }
}
