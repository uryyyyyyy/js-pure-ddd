import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import {Count} from '../domain/entities/Count'
import {CountRepository} from '../domain/repositories';
import {injectable} from 'inversify';

@injectable()
export class CountRepositoryImpl implements CountRepository {

  private count: BehaviorSubject<Count>

  constructor() {
    this.count = new BehaviorSubject(new Count(0))
  }

  /**
   * save to storage
   */
  save(count: Count): void {
    this.count.next(count)
  }

  /**
   * get current count
   */
  getCount(): Count {
    return this.count.value
  }

  /**
   * get count observable
   */
  getCountObservable(): Observable<Count> {
    return this.count
  }
}
