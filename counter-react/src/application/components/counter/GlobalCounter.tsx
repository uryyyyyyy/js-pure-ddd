import 'promise.prototype.finally'
import {Count} from '../../../domain/entities/Count';
import {CountPersistRepository, isFail} from '../../../domain/repository/CountPersistRepository';
import {TYPES} from "../../context/di-types";
import {CountVolatileRepository} from "../../../domain/repository/CountVolatileRepository";
import * as React from "react";
import {lazyInject} from "../../context/context";

export interface State {
  count: number
  loadingCount: number
}

export class GlobalCounter extends React.Component<{}, State> {

  @lazyInject(TYPES.CountPersistRepository) private countPRepo?: CountPersistRepository;
  @lazyInject(TYPES.CountVolatileRepository) private countSRepo?: CountVolatileRepository;

  constructor(props: {}) {
    super(props)
    this.state = {
      loadingCount: 0,
      count: 0,
    }
  }

  increment(amount: number):void {
    this.countSRepo!.increment(amount)
  }

  decrement(amount: number):void {
    this.countSRepo!.decrement(amount)
  }

  reload(): void {
    this.setState({loadingCount: this.state.loadingCount + 1})
    this.countPRepo!.fetchCount()
      .then(count => this.countSRepo!.update(count))
      .catch(e => console.error(e))
      .finally(() => {
        this.setState({loadingCount: this.state.loadingCount - 1})
      })
  }

  save(): void {
    this.setState({loadingCount: this.state.loadingCount + 1})
    this.countPRepo!.saveCount(new Count(this.state.count))
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
    this.countSRepo!.getStateObservable()
      .subscribe((count: Count) => {
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
