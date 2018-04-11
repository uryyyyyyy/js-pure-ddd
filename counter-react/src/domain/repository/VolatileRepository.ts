import {Observable} from 'rxjs/Observable';

export interface VolatileRepository<State> {

  /**
   * get current state
   */
  getState(): State

  /**
   * get state stream
   */
  getStateObservable(): Observable<State>
}
