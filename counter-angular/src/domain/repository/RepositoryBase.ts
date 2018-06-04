import {Observable} from 'rxjs'

export interface RepositoryBase<State> {
  /**
   * get current state
   */
  getState(): State

  /**
   * get state stream
   */
  getStateObservable(): Observable<State>

  update(count: State): void
}
