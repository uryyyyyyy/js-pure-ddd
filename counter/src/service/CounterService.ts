import Count from '../domain/Count'
import counterRepository, {CounterRepository} from '../infra/CounterRepository'
import {Observable} from 'rxjs/Observable'

export class CounterService {

  constructor(private counterRepo: CounterRepository) {}

  /**
   * 加算
   */
  increment(amount: number): void {
    const count = this.counterRepo.getCount()
    const newCount = count.increment(amount)
    this.counterRepo.save(newCount)
  }

  /**
   * 減算
   */
  decrement(amount: number): void {
    const count = this.counterRepo.getCount()
    const newCount = count.decrement(amount)
    this.counterRepo.save(newCount)
  }

  /**
   * countを取得
   */
  getCount(): Count {
    return this.counterRepo.getCount()
  }

  /**
   * observableを取得
   */
  getObservable(): Observable<Count> {
    return this.counterRepo.subject
  }
}

// singleton
export default new CounterService(counterRepository)