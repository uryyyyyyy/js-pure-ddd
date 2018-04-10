import { Observable } from 'rxjs'

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
