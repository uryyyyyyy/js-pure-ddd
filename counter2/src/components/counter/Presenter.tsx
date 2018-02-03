import 'promise.prototype.finally'
import * as React from 'react'
import {Counter} from './Counter';
import {CounterService} from '../../domain/services/CounterService';
import 'rxjs/add/operator/skip'
import {Count} from '../../domain/entities/Count';

interface Props {
  counterService: CounterService
}

interface State {
  count: Count
  loadingCount: number
  counterService: CounterService
}

export class Presenter extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      loadingCount: 0,
      count: props.counterService.getCount(),
      counterService: props.counterService
    }
    props.counterService.getCountObservable().skip(1)
      .subscribe((count: Count) => this.setState({count}))
  }

  componentDidMount() {
    this.reload()
  }

  increment = (amount: number) => {
    this.state.counterService.increment(amount)
  }

  decrement = (amount: number) => {
    this.state.counterService.decrement(amount)
  }

  save = () => {
    this.state.counterService.save()
      .then(() => alert('save done'))
      .catch(() => alert('save fail'))
  }

  reload = () => {
    this.setState({loadingCount: this.state.loadingCount + 1})
    this.state.counterService.reload()
      .finally(() => this.setState({loadingCount: this.state.loadingCount - 1}))
  }

  render() {
    return (
      <Counter
        count={this.state.count}
        increment={this.increment}
        decrement={this.decrement}
        save={this.save}
        reload={this.reload}
        loadingCount={this.state.loadingCount}
      />
    )
  }
}