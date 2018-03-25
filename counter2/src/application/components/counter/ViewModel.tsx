import 'promise.prototype.finally'
import 'rxjs/add/operator/skip'
import {Count} from '../../../domain/entities/Count';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../context/di-types';
import {CountSessionRepository} from '../../../domain/repository/CountSessionRepository';
import {Observable} from 'rxjs/Observable';
import {CountPersistRepository} from '../../../domain/repository/CountPersistRepository';

export interface CounterViewModelState {
  count: number
  loadingCount: number
}

export interface CounterViewModel {
  increment(amount: number): void
  decrement(amount: number):void
  getStateStream(): Observable<CounterViewModelState>
  getState(): CounterViewModelState,
  reload(): void
  save(): void
}

@injectable()
export class CounterViewModelImpl implements CounterViewModel {

  private state: BehaviorSubject<CounterViewModelState>

  constructor(
    @inject(TYPES.CountSessionRepository) private countSRepo: CountSessionRepository,
    @inject(TYPES.CountPersistRepository) private countPRepo: CountPersistRepository
  ) {
    this.state = new BehaviorSubject<CounterViewModelState>({
      loadingCount: 0,
      count: countSRepo.getState().getValue(),
    })
    countSRepo.getStateObservable().skip(1)
      .subscribe((count: Count) => {
        const current = this.state.getValue()
        this.state.next({...current, count: count.getValue()})
      })
  }

  increment(amount: number):void {
    this.countSRepo.increment(amount)
  }

  decrement(amount: number):void {
    this.countSRepo.decrement(amount)
  }

  getStateStream(): Observable<CounterViewModelState> {
    return this.state.asObservable()
  }

  getState(): CounterViewModelState {
    return this.state.getValue();
  }

  reload(): void {
    const current1 = this.state.getValue()
    this.state.next({...current1, loadingCount: current1.loadingCount + 1})
    this.countPRepo.fetchCount()
      .then(count => this.countSRepo.update(count))
      .catch(e => console.error(e))
      .finally(() => {
        const current2 = this.state.getValue()
        this.state.next({...current2, loadingCount: current2.loadingCount - 1})
      })
  }

  save(): void {
    const current = this.state.getValue()
    this.countPRepo.saveCount(new Count(current.count))
      .then(() => window.alert('セーブしました'))
      .catch(e => console.error(e))
  }
}
