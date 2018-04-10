import {injectable} from 'inversify';
import {CountPersistRepository, Fail} from '../../domain/repository/CountPersistRepository';
import {Count} from '../../domain/entities/Count';

const myHeaders = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
})

@injectable()
export class CountPersistRepositoryServer implements CountPersistRepository {

  constructor() {}

  saveCount(count: Count): Promise<void | Fail> {
    return fetch('/api/count', {
      method: 'PUT',
      body: JSON.stringify({amount: count.getValue()}),
      headers: myHeaders
    })
      .then(async (response: Response) => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve()
        } else {
          return response.json().then((res: {reason: string}) => {
            return {err: new Error(`server Error: ${res.reason}`)}
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