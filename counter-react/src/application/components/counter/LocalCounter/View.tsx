import * as React from 'react'
import {LocalCounterViewModel, State, ViewModel} from './ViewModel';

interface Props {
  viewModel: ViewModel
}

export class View extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = props.viewModel.getState()
  }

  componentDidMount(){
    this.props.viewModel.getStateStream()
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

  const viewModel = new LocalCounterViewModel()

  return (<View
    viewModel={viewModel}
  />)
}