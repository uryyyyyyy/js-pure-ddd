// import {Count} from '../entities/Count';
// import {SessionRepository} from './SessionRepository';
//
// // interface CountRepoEvent{}
// //
// // export class FetchFinishEvent implements CountRepoEvent {}
// //
// // export class SaveFinishEvent implements CountRepoEvent {}
// //
// // export class FailEvent implements CountRepoEvent {
// //   constructor(public error: Error) {}
// // }
//
// export interface CountSessionRepository extends SessionRepository<Count> {
//
//   increment(num: number): void
//
//   decrement(num: number): void
// }

import {Count} from '../entities/Count';
import {SessionRepository} from './SessionRepository';

export interface CountSessionRepository extends SessionRepository<Count> {
  increment(num: number): void
  decrement(num: number): void
}