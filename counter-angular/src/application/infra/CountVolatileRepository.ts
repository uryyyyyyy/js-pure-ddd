import {BehaviorSubject, Observable} from 'rxjs'
import {Count} from '../../domain/entities/Count'
import {CountVolatileRepository} from '../../domain/repository/CountVolatileRepository'
import {Inject, Injectable} from '@angular/core'
import {STORE} from '../context/inject';
import {Store} from 'redux';
import {DecrementAction, IncrementAction, UpdateAction} from './store/CountReducer';

@Injectable()
export class CountVolatileRepositoryImpl implements CountVolatileRepository {
  private readonly countBSubject: BehaviorSubject<Count>

  constructor(
    @Inject(STORE) private globalStore: Store,
  ) {
    this.countBSubject = new BehaviorSubject(new Count(0))
    globalStore.subscribe(() => {
      this.countBSubject.next(globalStore.getState().count)
    })
  }

  getState(): Count {
    return this.countBSubject.getValue()
  }

  getStateObservable(): Observable<Count> {
    return this.countBSubject
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
