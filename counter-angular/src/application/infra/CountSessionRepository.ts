import { BehaviorSubject, Subject } from 'rxjs'
import { Count } from '../../domain/entities/Count'
import { CountVolatileRepository } from '../../domain/repository/CountVolatileRepository'
import { Injectable } from '@angular/core'

interface IncrementAction {
  type: 'INCREMENT'
  num: number
}

interface DecrementAction {
  type: 'DECREMENT'
  num: number
}

interface UpdateAction {
  type: 'UPDATE'
  count: Count
}

export type Actions = IncrementAction | DecrementAction | UpdateAction

@Injectable()
export class CountVolatileRepositoryImpl extends CountVolatileRepository {
  private readonly countBSubject: BehaviorSubject<Count>

  // 更新を明示的にシーケンシャルにするために使う。（JSだとそもそもSingleThreadだが）
  private updateStream: Subject<Actions>

  constructor() {
    super()
    this.countBSubject = new BehaviorSubject(new Count(0))
    this.updateStream = new Subject()
    this.updateStream.forEach((e: Actions) => this._update(e))
  }

  private _update(e: Actions): void {
    switch (e.type) {
      case 'INCREMENT':
        this.countBSubject.next(this.countBSubject.value.increment(e.num))
        break
      case 'DECREMENT':
        this.countBSubject.next(this.countBSubject.value.decrement(e.num))
        break
      case 'UPDATE':
        this.countBSubject.next(e.count)
        break
      default:
        const _e: never = e
        console.warn(_e)
        break
    }
  }

  getState = () => {
    return this.countBSubject.getValue()
  }

  getStateObservable = () => {
    return this.countBSubject
  }

  increment = (num: number) => {
    const event: IncrementAction = {
      type: 'INCREMENT',
      num
    }
    this.updateStream.next(event)
  }

  decrement = (num: number) => {
    const event: DecrementAction = {
      type: 'DECREMENT',
      num
    }
    this.updateStream.next(event)
  }

  update = (count: Count) => {
    const event: UpdateAction = {
      type: 'UPDATE',
      count
    }
    this.updateStream.next(event)
  }
}
