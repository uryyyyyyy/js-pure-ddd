import * as React from 'react'
import {Counter} from './Counter';
import {CounterService} from '../../services/CounterService';
import 'rxjs/add/operator/skip'
import {Count} from '../../entities/Count';

interface Props {
  counterService: CounterService
}

interface State {
  count: Count
  isLoading: boolean
  counterService: CounterService
}

export class Presenter extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = { isLoading: false, count: new Count(0), counterService: props.counterService}
    props.counterService.getCountObservable().skip(1)
      .subscribe((count: Count) => this.setState({count}))
  }

  increment = (amount: number) => {
    this.state.counterService.increment(amount)
  }

  decrement = (amount: number) => {
    this.state.counterService.decrement(amount)
  }

  render() {
    return (
      <Counter
        count={this.state.count}
        increment={this.increment}
        decrement={this.decrement}
        isLoading={this.state.isLoading}
      />
    )
  }
}