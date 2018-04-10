import * as React from 'react'
import {CounterViewModelImpl, State, ViewModel} from './ViewModel';

interface Props {
  viewModel: ViewModel
}

export class View extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = props.viewModel.getState()
    props.viewModel.getStateStream().skip(1)
      .subscribe(viewModelState => this.setState(viewModelState))
  }

  render() {
    return (
      <div>
        <h2>Local Counter</h2>
        <p>{`internal count: ${this.state.internalCount}`}</p>
        <button onClick={() => this.props.viewModel.internalIncrement(3)}>Internal Increment 3</button>
        <button onClick={() => this.props.viewModel.internalDecrement(2)}>Internal Decrement 2</button>
      </div>
    )
  }
}

export const LocalCounter: React.StatelessComponent<{}> = () => {

  const viewModel = new CounterViewModelImpl()

  return (<View
    viewModel={viewModel}
  />)
}