import 'promise.prototype.finally'
import 'rxjs/add/operator/skip'
import {Count} from '../../../../domain/entities/Count';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CountVolatileRepository} from '../../../../domain/repository/CountVolatileRepository';
import {Observable} from 'rxjs/Observable';
import {CountPersistRepository, isFail} from '../../../../domain/repository/CountPersistRepository';
import {Subject} from 'rxjs/Subject';

export interface State {
  count: number
  loadingCount: number
}

export interface ViewModel {
  increment(amount: number): void
  decrement(amount: number):void
  getStateStream(): Observable<State>
  getState(): State,
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

export type Actions = LCIncrementAction |
  LCDecrementAction |
  CountUpdateAction

export class CounterViewModelImpl implements ViewModel {

  private state: BehaviorSubject<State>

  // 更新を明示的にシーケンシャルにするために使う。（JSだとそもそもSingleThreadだが）
  private updateStream: Subject<Actions>

  constructor(
    private countSRepo: CountVolatileRepository,
    private countPRepo: CountPersistRepository
  ) {
    this.state = new BehaviorSubject<State>({
      loadingCount: 0,
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

  getStateStream(): Observable<State> {
    return this.state.asObservable()
  }

  getState(): State {
    return this.state.getValue();
  }

  reload(): void {
    this.updateStream.next({type: 'LC_INCREMENT'})
    this.countPRepo.fetchCount()
      .then(count => this.countSRepo.update(count))
      .catch(e => console.error(e))
      .finally(() => this.updateStream.next({type: 'LC_DECREMENT'}))
  }

  save(): void {
    this.updateStream.next({type: 'LC_INCREMENT'})
    const current = this.state.getValue()
    this.countPRepo.saveCount(new Count(current.count))
      .then((result) => {
        if(isFail(result)) {
          window.alert(result.err.message)
        } else {
          window.alert('セーブしました')
        }
      })
      .catch(e => {
        console.error(e)
        window.alert('サーバーに繋がりませんでした')
      })
      .finally(() => this.updateStream.next({type: 'LC_DECREMENT'}))
  }
}
