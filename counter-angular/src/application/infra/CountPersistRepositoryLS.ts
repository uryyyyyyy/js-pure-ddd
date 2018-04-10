import { CountPersistRepository, Fail } from '../../domain/repository/CountPersistRepository'
import { Count } from '../../domain/entities/Count'
import { Injectable } from '@angular/core'

const countKey = 'COUNT'

@Injectable()
export class CountPersistRepositoryLS implements CountPersistRepository {
  saveCount(count: Count): Promise<void | Fail> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        Number(localStorage.setItem(countKey, count.getValue().toString()))
        resolve()
      }, 1000)
    })
  }

  fetchCount(): Promise<Count> {
    const num = Number(localStorage.getItem(countKey))
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(new Count(num))
      }, 1000)
    })
  }
}
