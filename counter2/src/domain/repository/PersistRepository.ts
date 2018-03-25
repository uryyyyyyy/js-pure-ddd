import {Observable} from 'rxjs/Observable';

export interface PersistRepository<DomainEvent> {

  /**
   * get event stream
   */
  getEventObservable(): Observable<DomainEvent>
}
