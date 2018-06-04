// import { CountRepository, Fail } from '../../domain/repository/CountRepository'
// import { Count } from '../../domain/entities/Count'
//
// const countKey = 'COUNT'
//
// @injectable()
// export class CountPersistRepositoryLS implements CountRepository {
//   saveCount(count: Count): Promise<void | Fail> {
//     return new Promise((resolve, _) => {
//       setTimeout(() => {
//         Number(localStorage.setItem(countKey, count.getValue().toString()))
//         resolve()
//       }, 1000)
//     })
//   }
//
//   fetchCount(): Promise<Count> {
//     const num = Number(localStorage.getItem(countKey))
//     return new Promise((resolve, _) => {
//       setTimeout(() => {
//         resolve(new Count(num))
//       }, 1000)
//     })
//   }
// }
