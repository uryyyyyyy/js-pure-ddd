import {Observable} from 'rxjs/Observable'
import {CountRepository} from '../repositories';
import {Count} from '../entities/Count';

export class CounterService {

  constructor(private countRepository: CountRepository) {}

  /**
   * increment counter value
   */
  increment(amount: number): void {
    const current = this.countRepository.getCount()
    this.countRepository.save(current.increment(amount))
  }

  /**
   * decrement counter value
   */
  decrement(amount: number): void {
    const current = this.countRepository.getCount()
    this.countRepository.save(current.decrement(amount))
  }

  /**
   * async increment value
   */
  reload(): Promise<void> {
    return this.countRepository.fetchCount().then(() => {return})
  }

  /**
   * save count value
   */
  save(): Promise<void> {
    return this.countRepository.saveToServer()
  }

  /**
   * get current count
   */
  getCount(): Count {
    return this.countRepository.getCount()
  }

  /**
   * get count observable
   */
  getCountObservable(): Observable<Count> {
    return this.countRepository.getCountObservable()
  }
}
