import 'promise.prototype.finally'
import {CounterService, Events} from '../../domain/services/CounterService';
import 'rxjs/add/operator/skip'
import {Count} from '../../domain/entities/Count';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../di-types';

export interface CounterViewModelState {
  count: Count
  loadingCount: number
}

export interface CounterViewModelNavigator {
  increment(amount: number): void
  decrement(amount: number):void
  save():void
  reload():void
}

@injectable()
export class CounterViewModel implements CounterViewModelNavigator {

  state: BehaviorSubject<CounterViewModelState>

  constructor(@inject(TYPES.CounterService) private counterService: CounterService) {
    const initialState = {
      loadingCount: 0,
      count: counterService.getCount(),
    }
    this.state = new BehaviorSubject<CounterViewModelState>(initialState)
    counterService.getCountObservable().skip(1)
      .subscribe((count: Count) => this.state.next({...this.state.getValue(), count}))

    counterService.getEventsObservable()
      .subscribe((event: Events) => {
        switch (event){
          case Events.REQUEST_START: {
            this.state.next({...this.state.getValue(), loadingCount: this.state.getValue().loadingCount + 1})
            return
          }
          case Events.REQUEST_FINISH: {
            this.state.next({...this.state.getValue(), loadingCount: this.state.getValue().loadingCount - 1})
            return
          }
          case Events.SAVE_SUCCESS: {
            return alert('save done')
          }
          case Events.SAVE_FAIL: {
            return alert('save fail')
          }
        }
      })
  }

  increment(amount: number):void {
    this.counterService.increment(amount)
  }

  decrement(amount: number):void {
    this.counterService.decrement(amount)
  }

  save():void {
    this.counterService.save()
  }

  reload():void {
    this.counterService.reload()
  }
}
