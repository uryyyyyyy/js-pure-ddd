import {Observable} from 'rxjs/Observable'
import {CountRepository} from '../repositories';
import {Count} from '../entities/Count';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../di-types';
import {Subject} from 'rxjs/Subject';

export enum Events {
  REQUEST_START,
  REQUEST_FINISH,
  SAVE_SUCCESS,
  SAVE_FAIL
}

@injectable()
export class CounterService {

  private eventObservable: Subject<Events>

  constructor(@inject(TYPES.CountRepository) private countRepository: CountRepository) {
    this.eventObservable = new Subject<Events>()
  }

  /**
   * increment counter value
   */
  increment(amount: number): void {
    const current = this.countRepository.getCount()
    this.countRepository.save(current.increment(amount))
  }

  /**
   * decrement counter value
   */
  decrement(amount: number): void {
    const current = this.countRepository.getCount()
    this.countRepository.save(current.decrement(amount))
  }

  /**
   * async increment value
   */
  reload(): void {
    this.eventObservable.next(Events.REQUEST_START)
    this.countRepository.fetchCount()
      .finally(() => this.eventObservable.next(Events.REQUEST_FINISH))
  }

  /**
   * save count value
   */
  save(): void {
    this.countRepository.saveToServer()
      .then(() => this.eventObservable.next(Events.SAVE_SUCCESS))
      .catch(() => this.eventObservable.next(Events.SAVE_FAIL))
  }

  /**
   * get current count
   */
  getCount(): Count {
    return this.countRepository.getCount()
  }

  /**
   * get count observable
   */
  getCountObservable(): Observable<Count> {
    return this.countRepository.getCountObservable()
  }

  /**
   * get events observable
   */
  getEventsObservable(): Observable<Events> {
    return this.eventObservable.asObservable()
  }
}
