import 'promise.prototype.finally'
import 'rxjs/add/operator/skip'
import {Count} from '../../../domain/entities/Count';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../context/di-types';
import {CountSessionRepository} from '../../../domain/repository/CountSessionRepository';
import {Observable} from 'rxjs/Observable';

export interface CounterViewModelState {
  count: number
  loadingCount: number
}

export interface CounterViewModel {
  increment(amount: number): void
  decrement(amount: number):void
  getStateStream(): Observable<CounterViewModelState>
  getState(): CounterViewModelState
}

@injectable()
export class CounterViewModelImpl implements CounterViewModel {

  private state: BehaviorSubject<CounterViewModelState>

  constructor(@inject(TYPES.CountSessionRepository) private counterRepository: CountSessionRepository) {
    this.state = new BehaviorSubject<CounterViewModelState>({
      loadingCount: 0,
      count: counterRepository.getState().getValue(),
    })
    counterRepository.getStateObservable().skip(1)
      .subscribe((count: Count) => {
        const current = this.state.getValue()
        this.state.next({...current, count: count.getValue()})
      })
  }

  increment(amount: number):void {
    this.counterRepository.increment(amount)
  }

  decrement(amount: number):void {
    this.counterRepository.decrement(amount)
  }

  getStateStream(): Observable<CounterViewModelState> {
    return this.state.asObservable()
  }

  getState(): CounterViewModelState {
    return this.state.getValue();
  }
}
