// import {BehaviorSubject} from 'rxjs/BehaviorSubject'
// import {Observable} from 'rxjs/Observable'
// import {Count} from '../domain/entities/Count'
// import {CountRepository} from '../domain/repositories';
// import {injectable} from 'inversify';
//
// @injectable()
// export class CountRepositoryImpl implements CountRepository {
//
//   private count: BehaviorSubject<Count>
//
//   private myHeaders = new Headers({
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest'
//   })
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
//     return fetch('/api/count', {
//       method: 'GET',
//       headers: this.myHeaders
//     })
//       .then((response: Response) => {
//         if (response.status === 200) { //2xx
//           return response.json()
//         } else {
//           throw new Error(`illegal status code: ${response.status}`)
//         }
//       })
//       .then((json: any) => {
//         const count = new Count(json.amount)
//         this.save(count)
//         return count
//       })
//   }
//
//   saveToServer(): Promise<void> {
//     const current = this.count.value
//     return fetch('/api/count', {
//       method: 'PUT',
//       body: JSON.stringify({amount: current.getValue()}),
//       headers: this.myHeaders
//     })
//       .then((response: Response) => {
//         if (response.status === 200) { //2xx
//           return
//         } else {
//           throw new Error(`illegal status code: ${response.status}`)
//         }
//       })
//   }
//
//   getCountObservable(): Observable<Count> {
//     return this.count
//   }
// }
