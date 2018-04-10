import 'promise.prototype.finally'
import 'rxjs/add/operator/skip'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

export interface State {
  internalCount: number
}

export interface ViewModel {
  internalIncrement(amount: number): void
  internalDecrement(amount: number):void
  getStateStream(): Observable<State>
  getState(): State,
}

interface InternalCountIncrementAction {
  type: 'I_COUNT_INCREMENT';
  num: number
}

interface InternalCountDecrementAction {
  type: 'I_COUNT_DECREMENT';
  num: number
}

export type Actions = InternalCountIncrementAction |
  InternalCountDecrementAction

export class CounterViewModelImpl implements ViewModel {

  private state: BehaviorSubject<State>

  // 更新を明示的にシーケンシャルにするために使う。（JSだとそもそもSingleThreadだが）
  private updateStream: Subject<Actions>

  constructor() {
    this.state = new BehaviorSubject<State>({
      internalCount: 0,
    })
    this.updateStream = new Subject()
    this.updateStream.forEach((e: Actions) => this._update(e))
  }

  private _update(e: Actions): void {
    const current = this.state.getValue()
    switch (e.type){
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

  internalIncrement(num: number): void {
    this.updateStream.next({type: 'I_COUNT_INCREMENT', num})
  }

  internalDecrement(num: number):void {
    this.updateStream.next({type: 'I_COUNT_DECREMENT', num})
  }

  getStateStream(): Observable<State> {
    return this.state.asObservable()
  }

  getState(): State {
    return this.state.getValue();
  }
}
