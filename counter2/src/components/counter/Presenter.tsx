import 'promise.prototype.finally'
import * as React from 'react'
import {Counter} from './Counter';
import {CounterService, Events} from '../../domain/services/CounterService';
import 'rxjs/add/operator/skip'
import {Count} from '../../domain/entities/Count';
import {getCounterService} from '../../context';

interface Props {
  counterService: CounterService
}

interface State {
  count: Count
  loadingCount: number
}

export class Presenter extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      loadingCount: 0,
      count: props.counterService.getCount(),
    }
    props.counterService.getCountObservable().skip(1)
      .subscribe((count: Count) => this.setState({count}))

    props.counterService.getEventsObservable()
      .subscribe((event: Events) => {
        switch (event){
          case Events.REQUEST_START: {
            return this.setState({loadingCount: this.state.loadingCount + 1})
          }
          case Events.REQUEST_FINISH: {
            return this.setState({loadingCount: this.state.loadingCount - 1})
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

  componentDidMount() {
    this.reload()
  }

  increment = (amount: number) => {
    this.props.counterService.increment(amount)
  }

  decrement = (amount: number) => {
    this.props.counterService.decrement(amount)
  }

  save = () => this.props.counterService.save()

  reload = () => this.props.counterService.reload()

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

export default () => <Presenter counterService={getCounterService()}/>
