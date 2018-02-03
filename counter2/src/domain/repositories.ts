import {Count} from './entities/Count';
import {Observable} from 'rxjs/Observable';

export interface CountRepository {
  /**
   * save to local
   */
  save(count: Count): void

  /**
   * get current count
   */
  getCount(): Count

  /**
   * get current count
   */
  fetchCount(): Promise<Count>

  /**
   * save to server
   */
  saveToServer(): Promise<void>

  /**
   * get count observable
   */
  getCountObservable(): Observable<Count>
}
