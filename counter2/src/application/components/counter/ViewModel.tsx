import 'promise.prototype.finally'
import 'rxjs/add/operator/skip'
import {Count} from '../../../domain/entities/Count';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../context/di-types';
import {CountSessionRepository} from '../../../domain/repository/CountSessionRepository';
import {Observable} from 'rxjs/Observable';
import {CountPersistRepository} from '../../../domain/repository/CountPersistRepository';
import {Subject} from 'rxjs/Subject';

export interface CounterViewModelState {
  count: number
  internalCount: number
  loadingCount: number
}

export interface CounterViewModel {
  increment(amount: number): void
  decrement(amount: number):void
  internalIncrement(amount: number): void
  internalDecrement(amount: number):void
  getStateStream(): Observable<CounterViewModelState>
  getState(): CounterViewModelState,
  reload(): void
  save(): void
}

interface LCIncrementAction {
  type: 'LC_INCREMENT'
}

interface LCDecrementAction {
  type: 'LC_DECREMENT';
}

interface CountUpdateAction {
  type: 'G_COUNT_UPDATE';
  count: Count
}

interface InternalCountIncrementAction {
  type: 'I_COUNT_INCREMENT';
  num: number
}

interface InternalCountDecrementAction {
  type: 'I_COUNT_DECREMENT';
  num: number
}

export type Actions = LCIncrementAction |
  LCDecrementAction |
  CountUpdateAction |
  InternalCountIncrementAction |
  InternalCountDecrementAction

@injectable()
export class CounterViewModelImpl implements CounterViewModel {

  private state: BehaviorSubject<CounterViewModelState>

  // 更新を明示的にシーケンシャルにするために使う。（JSだとそもそもSingleThreadだが）
  private updateStream: Subject<Actions>

  constructor(
    @inject(TYPES.CountSessionRepository) private countSRepo: CountSessionRepository,
    @inject(TYPES.CountPersistRepository) private countPRepo: CountPersistRepository
  ) {
    this.state = new BehaviorSubject<CounterViewModelState>({
      loadingCount: 0,
      internalCount: 0,
      count: countSRepo.getState().getValue(),
    })
    countSRepo.getStateObservable()
      .skip(1)
      .subscribe(count => this.updateStream.next({type: 'G_COUNT_UPDATE', count}))
    this.updateStream = new Subject()
    this.updateStream.forEach((e: Actions) => this._update(e))
  }

  private _update(e: Actions): void {
    const current = this.state.getValue()
    switch (e.type){
      case 'LC_INCREMENT':
        this.state.next({...current, loadingCount: current.loadingCount + 1})
        break;
      case 'LC_DECREMENT':
        this.state.next({...current, loadingCount: current.loadingCount - 1})
        break;
      case 'G_COUNT_UPDATE':
        this.state.next({...current, count: e.count.getValue()})
        break;
      case 'I_COUNT_INCREMENT':
        this.state.next({...current, internalCount: current.internalCount + e.num})
        break;
      case 'I_COUNT_DECREMENT':
        this.state.next({...current, internalCount: current.internalCount - e.num})
        break;
      default:
        const _e: never = e;
        console.warn(_e)
        break
    }
  }

  increment(amount: number):void {
    this.countSRepo.increment(amount)
  }

  decrement(amount: number):void {
    this.countSRepo.decrement(amount)
  }

  internalIncrement(num: number): void {
    this.updateStream.next({type: 'I_COUNT_INCREMENT', num})
  }

  internalDecrement(num: number):void {
    this.updateStream.next({type: 'I_COUNT_DECREMENT', num})
  }

  getStateStream(): Observable<CounterViewModelState> {
    return this.state.asObservable()
  }

  getState(): CounterViewModelState {
    return this.state.getValue();
  }

  reload(): void {
    this.updateStream.next({type: 'LC_INCREMENT'})
    this.countPRepo.fetchCount()
      .then(count => this.countSRepo.update(count))
      .catch(e => console.error(e))
      .finally(() => {
        this.updateStream.next({type: 'LC_DECREMENT'})
      })
  }

  save(): void {
    const current = this.state.getValue()
    this.countPRepo.saveCount(new Count(current.count))
      .then(() => window.alert('セーブしました'))
      .catch(e => console.error(e))
  }
}
