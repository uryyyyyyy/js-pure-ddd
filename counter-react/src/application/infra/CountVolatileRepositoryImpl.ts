import {BehaviorSubject, Observable} from 'rxjs'
import {Count} from '../../domain/entities/Count'
import {inject, injectable} from 'inversify';
import {CountVolatileRepository} from '../../domain/repository/CountVolatileRepository';
import {DecrementAction, IncrementAction, UpdateAction} from "./store/CountReducer";
import {Store} from "redux";
import {TYPES} from "../context/di-types";

@injectable()
export class CountVolatileRepositoryImpl implements CountVolatileRepository {

  private readonly countBSubject: BehaviorSubject<Count>
  private readonly globalStore: Store

  constructor(
    @inject(TYPES.GlobalStore) store: Store
  ) {
    this.globalStore = store
    this.countBSubject = new BehaviorSubject(new Count(0))
    store.subscribe(() => this.countBSubject.next(store.getState()))
  }

  getState(): Count {
    return this.countBSubject.getValue();
  }

  getStateObservable(): Observable<Count> {
    return this.countBSubject;
  }

  increment(num: number): void {
    const event: IncrementAction = {
      customAction: true,
      type: 'INCREMENT',
      num
    }
    this.globalStore.dispatch(event)
  }

  decrement(num: number): void {
    const event: DecrementAction = {
      customAction: true,
      type: 'DECREMENT',
      num
    }
    this.globalStore.dispatch(event)
  }

  update(count: Count): void {
    const event: UpdateAction = {
      customAction: true,
      type: 'UPDATE',
      count
    }
    this.globalStore.dispatch(event)
  }
}
