import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import {Count} from '../../domain/entities/Count'
import {SessionRepository} from '../../domain/repository/SessionRepository';
import {Subject} from 'rxjs/Subject';
import {injectable} from 'inversify';

interface IncrementAction {
  type: 'INCREMENT';
  num: number
}

interface DecrementAction {
  type: 'DECREMENT';
  num: number
}

export type Actions = IncrementAction | DecrementAction;

export interface CountSessionRepository extends SessionRepository<Count> {
  increment(num: number): void
  decrement(num: number): void
}

@injectable()
export class CountSessionRepositoryImpl implements CountSessionRepository {

  private countBSubject: BehaviorSubject<Count>

  // 更新をシーケンシャルにするために使う。（JSだとそもそもシーケンシャル）
  private updateStream: Subject<Actions>

  constructor() {
    this.countBSubject = new BehaviorSubject(new Count(0))
    this.updateStream = new Subject()
    this.updateStream.forEach((e: Actions) => this.update(e))
  }

  private update(e: Actions): void {
    switch (e.type){
      case 'INCREMENT':
        this.countBSubject.next(this.countBSubject.value.increment(e.num))
        break;
      case 'DECREMENT':
        this.countBSubject.next(this.countBSubject.value.decrement(e.num))
        break;
      default:
        const _e: never = e;
        console.warn(_e)
        break
    }
  }

  getState(): Count {
    return this.countBSubject.getValue();
  }

  getStateObservable(): Observable<Count> {
    return this.countBSubject;
  }

  increment(num: number): void {
    const event: IncrementAction = {
      type: 'INCREMENT',
      num
    }
    this.updateStream.next(event)
  }

  decrement(num: number): void {
    const event: DecrementAction = {
      type: 'DECREMENT',
      num
    }
    this.updateStream.next(event)
  }
}
