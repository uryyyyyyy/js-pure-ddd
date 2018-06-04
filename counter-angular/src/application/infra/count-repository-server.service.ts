import {CountRepository, Fail} from '../../domain/repository/CountRepository'
import {Count} from '../../domain/entities/Count'
import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs/index';

const myHeaders = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
})

@Injectable()
export class CountRepositoryServer implements CountRepository {
  private readonly countBSubject: BehaviorSubject<Count>

  constructor() {
    this.countBSubject = new BehaviorSubject(new Count(0))
  }

  getState(): Count {
    return this.countBSubject.getValue()
  }

  getStateObservable(): Observable<Count> {
    return this.countBSubject
  }

  update(count: Count): void {
    this.countBSubject.next(count)
  }

  saveCount(count: Count): Promise<void | Fail> {
    return fetch('/api/count', {
      method: 'PUT',
      body: JSON.stringify({ amount: count.getValue() }),
      headers: myHeaders
    }).then(async (response: Response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve()
      } else {
        return response.json().then((res: { reason: string }) => {
          return { err: new Error(`server Error: ${res.reason}`) }
        })
      }
    })
  }

  fetchCount(): Promise<Count> {
    return fetch('/api/count', {
      method: 'GET',
      headers: myHeaders
    })
      .then((response: Response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          throw new Error(`illegal status code: ${response.status}`)
        }
      })
      .then((json: any) => {
        return new Count(json.amount)
      })
  }
}
