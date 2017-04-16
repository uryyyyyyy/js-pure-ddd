import * as React from 'react'
import Count from '../domain/Count'
import {CounterService} from '../services/CounterService'

interface Props {
  counterService: CounterService
}

interface State {
  count: Count
}

export default class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = { count: props.counterService.getCount()}

    props.counterService.getObservable()
      .subscribe(count => this.setState({count}))
  }

  render() {
    return (
      <div>
        <p>{`score: ${this.state.count.getCount()}`}</p>
        <button onClick={() => this.props.counterService.increment(3)}>Increment 3</button>
        <button onClick={() => this.props.counterService.decrement(2)}>Decrement 2</button>
      </div>
    )
  }
}