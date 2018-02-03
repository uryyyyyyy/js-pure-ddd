import {Observable} from 'rxjs/Observable'
import {CountRepository} from '../repositories/CountRepository';

export class CounterService {

  constructor(private countRepository: CountRepository) {}

  /**
   * increment counter value
   */
  increment(amount: number): void {
    this.countRepository.save(this.countRepository.getCount() + amount)
  }

  /**
   * decrement counter value
   */
  decrement(amount: number): void {
    this.countRepository.save(this.countRepository.getCount() - amount)
  }

  /**
   * get current count
   */
  getCount(): number {
    return this.countRepository.getCount()
  }

  /**
   * get count observable
   */
  getCountObservable(): Observable<number> {
    return this.countRepository.getCountObservable()
  }
}
