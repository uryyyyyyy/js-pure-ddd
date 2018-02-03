import {Count} from './entities/Count';
import {Observable} from 'rxjs/Observable';

export interface CountRepository {
  /**
   * save to storage
   */
  save(count: Count): void

  /**
   * get current count
   */
  getCount(): Count

  /**
   * get count observable
   */
  getCountObservable(): Observable<Count>
}
