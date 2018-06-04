import {CountRepository, Fail} from '../repository/CountRepository';
import {Count} from '../entities/Count';

export class CounterService {

  public constructor(
    private countRepo: CountRepository
  ) {}

  fetchLatest(): Promise<void> {
    return this.countRepo
      .fetchCount()
      .then((count) => this.countRepo.update(count))
  }

  save(count: Count): Promise<void | Fail> {
    return this.countRepo
      .saveCount(count)
  }

  increment(num: number): void {
    const count = this.countRepo.getState()
    this.countRepo.update(count.increment(num))
  }

  decrement(num: number): void {
    const count = this.countRepo.getState()
    this.countRepo.update(count.decrement(num))
  }

  subscribe(next: (value: Count) => void): void {
    this.countRepo.getStateObservable().subscribe(next)
  }
}