import * as React from 'react'
import {CounterViewModelNavigator, CounterViewModelState} from './ViewModel';

interface Props {
  navigator: CounterViewModelNavigator
  state: CounterViewModelState
}

export const Counter: React.StatelessComponent<Props> = (props: Props) =>
  <div>
    <p>{`count: ${props.state.count.getValue()}`}</p>
    <button onClick={() => props.navigator.increment(3)}>Increment 3</button>
    <button onClick={() => props.navigator.decrement(2)}>Decrement 2</button>
    <button onClick={() => props.navigator.save()}>save</button>
    <button onClick={() => props.navigator.reload()}>reload</button>
    {(props.state.loadingCount === 0) ? null : <p>loading</p>}
  </div>
