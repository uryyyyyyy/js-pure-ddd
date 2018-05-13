import {BehaviorSubject, Observable} from 'rxjs';

export interface State {
  internalCount: number
}

export interface ViewModel {
  internalIncrement(amount: number): void
  internalDecrement(amount: number):void
  getStateStream(): Observable<State>
  getState(): State,
}

export class LocalCounterViewModel implements ViewModel {

  private state: BehaviorSubject<State>

  constructor() {
    this.state = new BehaviorSubject<State>({
      internalCount: 0,
    })
  }

  internalIncrement(num: number): void {
    const current = this.state.getValue()
    this.state.next({...current, internalCount: current.internalCount + num})
  }

  internalDecrement(num: number):void {
    const current = this.state.getValue()
    this.state.next({...current, internalCount: current.internalCount - num})
  }

  getStateStream(): Observable<State> {
    return this.state.asObservable()
  }

  getState(): State {
    return this.state.getValue();
  }
}
