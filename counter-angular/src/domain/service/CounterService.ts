import {CountRepository, Fail} from '../repository/CountRepository';
import {Count} from '../entities/Count';

export class CounterService {

  public constructor(
    private countPRepo: CountRepository
  ) {}

  fetchLatest(): Promise<void> {
    return this.countPRepo
      .fetchCount()
      .then((count) => this.countPRepo.update(count))
  }

  save(count: Count): Promise<void | Fail> {
    return this.countPRepo
      .saveCount(count)
  }

  increment(num: number): void {
    const count = this.countPRepo.getState()
    this.countPRepo.update(count.increment(num))
  }

  decrement(num: number): void {
    const count = this.countPRepo.getState()
    this.countPRepo.update(count.decrement(num))
  }

  subscribe(next: (value: Count) => void): void {
    this.countPRepo.getStateObservable().subscribe(next)
  }
}