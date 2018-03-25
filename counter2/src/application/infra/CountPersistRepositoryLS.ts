import {injectable} from 'inversify';
import {CountPersistRepository} from '../../domain/repository/CountPersistRepository';
import {Count} from '../../domain/entities/Count';

const countKey = 'COUNT'

@injectable()
export class CountPersistRepositoryLS implements CountPersistRepository {

  constructor() {}

  saveCount(count: Count): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Number(localStorage.setItem(countKey, count.getValue().toString()))
        resolve();
      }, 100);
    })
  }

  fetchCount(): Promise<Count> {
    const num = Number(localStorage.getItem(countKey))
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(new Count(num));
      }, 1000);
    })
  }

}