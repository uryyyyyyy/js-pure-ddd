// import {BehaviorSubject} from 'rxjs/BehaviorSubject'
// import {Observable} from 'rxjs/Observable'
// import {Count} from '../domain/entities/Count'
// import {CountRepository} from '../domain/repositories';
// import {injectable} from 'inversify';
//
// const countKey = 'COUNT'
//
// @injectable()
// export class CountRepositoryLocal implements CountRepository {
//
//   private count: BehaviorSubject<Count>
//
//   constructor() {
//     this.count = new BehaviorSubject(new Count(0))
//   }
//
//   save(count: Count): void {
//     this.count.next(count)
//   }
//
//   getCount(): Count {
//     return this.count.value
//   }
//
//   fetchCount(): Promise<Count> {
//     const num = Number(sessionStorage.getItem(countKey))
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve();
//       }, 1000);
//     })
//       .then(() => {
//         const count = new Count(num)
//         this.save(count)
//         return count
//       })
//   }
//
//   saveToServer(): Promise<void> {
//     const current = this.count.value
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         Number(sessionStorage.setItem(countKey, current.getValue().toString()))
//         resolve();
//       }, 100);
//     })
//   }
//
//   getCountObservable(): Observable<Count> {
//     return this.count
//   }
// }
