
import {Subject} from 'rxjs/Subject'
import Count from '../domain/Count'

const countKey = 'COUNT_KEY'

export class CounterRepository {

  subject: Subject<Count>

  constructor(private storage: Storage) {
    this.subject = new Subject()
  }

  /**
   * saveするよ
   */
  save(count: Count) {
    this.storage.setItem(countKey, count.getCount().toString())
    this.subject.next(count)
  }

  /**
   * 取得するよ
   */
  getCount(): Count {
    const count: number = Number(this.storage.getItem(countKey))
    return new Count(count)
  }
}

// singleton
export default new CounterRepository(sessionStorage)