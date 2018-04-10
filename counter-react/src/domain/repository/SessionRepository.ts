import {Observable} from 'rxjs/Observable';

export interface SessionRepository<State> {

  /**
   * get current state
   */
  getState(): State

  /**
   * get state stream
   */
  getStateObservable(): Observable<State>
}
