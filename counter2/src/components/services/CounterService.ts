import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'

export class CounterService {

  private countSubject: BehaviorSubject<number>

  constructor(amount: number) {
    this.countSubject = new BehaviorSubject(amount);
  }

  /**
   * increment counter value
   */
  increment(amount: number): void {
    this.countSubject.next(this.countSubject.value + amount)
  }

  /**
   * decrement counter value
   */
  decrement(amount: number): void {
    this.countSubject.next(this.countSubject.value - amount)
  }

  /**
   * get current count
   */
  getCount(): number {
    return this.countSubject.value
  }

  /**
   * get count observable
   */
  getCountObservable(): Observable<number> {
    return this.countSubject
  }
}
