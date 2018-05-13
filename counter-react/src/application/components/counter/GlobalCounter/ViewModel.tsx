import 'promise.prototype.finally'
import {Count} from '../../../../domain/entities/Count';
import {BehaviorSubject, Observable} from 'rxjs';
import {skip} from 'rxjs/operators';
import {CountVolatileRepository} from '../../../../domain/repository/CountVolatileRepository';
import {CountPersistRepository, isFail} from '../../../../domain/repository/CountPersistRepository';

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

export class CounterViewModel implements ViewModel {

  private state: BehaviorSubject<State>

  constructor(
    private countSRepo: CountVolatileRepository,
    private countPRepo: CountPersistRepository
  ) {
    this.state = new BehaviorSubject<State>({
      loadingCount: 0,
      count: countSRepo.getState().getValue(),
    })
    countSRepo.getStateObservable()
      .pipe(skip(1))
      .subscribe(count => {
        this.state.next({...this.state.getValue(), count: count.getValue()})
      })
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
    const current = this.state.getValue()
    this.state.next({...current, loadingCount: current.loadingCount + 1})
    this.countPRepo.fetchCount()
      .then(count => this.countSRepo.update(count))
      .catch(e => console.error(e))
      .finally(() => {
        const current = this.state.getValue()
        this.state.next({...current, loadingCount: current.loadingCount - 1})
      })
  }

  save(): void {
    const current = this.state.getValue()
    this.state.next({...current, loadingCount: current.loadingCount + 1})
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
      .finally(() => {
        const current = this.state.getValue()
        this.state.next({...current, loadingCount: current.loadingCount - 1})
      })
  }
}
