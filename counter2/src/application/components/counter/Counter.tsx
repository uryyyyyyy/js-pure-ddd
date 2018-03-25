import * as React from 'react'
import {CounterViewModel, CounterViewModelState} from './ViewModel';

interface Props {
  viewModel: CounterViewModel
  state: CounterViewModelState
}

export const Counter: React.StatelessComponent<Props> = (props: Props) =>
  <div>
    <p>{`count: ${props.state.count}`}</p>
    <button onClick={() => props.viewModel.increment(3)}>Increment 3</button>
    <button onClick={() => props.viewModel.decrement(2)}>Decrement 2</button>
    {(props.state.loadingCount === 0) ? null : <p>loading</p>}
  </div>
