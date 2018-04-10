import * as React from 'react'
import {CounterViewModel, CounterViewModelState} from './ViewModel';

interface Props {
  viewModel: CounterViewModel
  state: CounterViewModelState
}

export const Counter: React.StatelessComponent<Props> = (props: Props) =>
  <div>
    <p>{`global count: ${props.state.count}`}</p>
    <p>{`internal count: ${props.state.internalCount}`}</p>
    <button onClick={() => props.viewModel.increment(3)}>Global Increment 3</button>
    <button onClick={() => props.viewModel.decrement(2)}>Global Decrement 2</button>
    <button onClick={() => props.viewModel.internalIncrement(3)}>Internal Increment 3</button>
    <button onClick={() => props.viewModel.internalDecrement(2)}>Internal Decrement 2</button>
    <button onClick={() => props.viewModel.save()}>Global save</button>
    <button onClick={() => props.viewModel.reload()}>Global reload</button>
    {(props.state.loadingCount === 0) ? null : <p>loading</p>}
  </div>
