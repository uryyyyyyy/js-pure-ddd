import 'promise.prototype.finally'
import {Count} from '../../../domain/entities/Count';
import {CountRepository, isFail} from '../../../domain/repository/CountRepository';
import {TYPES} from "../../context/di-types";
import * as React from "react";
import {lazyInject} from "../../context/context";
import {CounterService} from "../../../domain/service/CounterService";

export interface State {
  count: number
  loadingCount: number
}

export class GlobalCounter extends React.Component<{}, State> {

  @lazyInject(TYPES.CountRepository) private countRepo?: CountRepository;
  private service?: CounterService

  constructor(props: {}) {
    super(props)
    this.state = {
      loadingCount: 0,
      count: 0,
    }
  }

  increment(amount: number):void {
    this.service!.increment(amount)
  }

  decrement(amount: number):void {
    this.service!.decrement(amount)
  }

  reload(): void {
    this.setState({loadingCount: this.state.loadingCount + 1})
    this.service!.fetchLatest()
      .catch(e => console.error(e))
      .finally(() => {
        this.setState({loadingCount: this.state.loadingCount - 1})
      })
  }

  save(): void {
    this.setState({loadingCount: this.state.loadingCount + 1})
    this.service!.save(new Count(this.state.count))
      .then((result) => {
        if(isFail(result)) {
          window.alert(result.err.message)
        } else {
          window.alert('セーブしました')
        }
      })
      .catch(e => {
        console.error(e)
        window.alert('サーバーに繋がりませんでした')
      })
      .finally(() => {
        this.setState({loadingCount: this.state.loadingCount - 1})
      })
  }

  componentDidMount(){
    this.service = new CounterService(this.countRepo!)
    this.service!.subscribe((count: Count) => {
      this.setState({...this.state, count: count.getValue()})
    })
    this.reload()
  }

  render() {
    return (
      <div>
        <h2>Global Counter</h2>
        <p>{`global count: ${this.state.count}`}</p>
        <button onClick={() => this.increment(3)}>Global Increment 3</button>
        <button onClick={() => this.decrement(2)}>Global Decrement 2</button>
        <button onClick={() => this.save()}>Global save</button>
        <button onClick={() => this.reload()}>Global reload</button>
        {(this.state.loadingCount === 0) ? null : <p>loading</p>}
      </div>
    )
  }
}
