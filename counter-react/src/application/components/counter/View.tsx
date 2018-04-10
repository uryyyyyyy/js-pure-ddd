import * as React from 'react'
import {ViewModel, CounterViewModelImpl, State} from './ViewModel';
import {getCountPersistRepository, getCountSessionRepository} from '../../context/context';

interface Props {
  viewModel: ViewModel
}

export class View extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    props.viewModel.getStateStream().skip(1)
      .subscribe(viewModelState => this.setState(viewModelState))
  }

  componentWillMount(){
    this.props.viewModel.reload()
  }

  render() {
    return (
      <div>
        <p>{`global count: ${this.state.count}`}</p>
        <p>{`internal count: ${this.state.internalCount}`}</p>
        <button onClick={() => this.props.viewModel.increment(3)}>Global Increment 3</button>
        <button onClick={() => this.props.viewModel.decrement(2)}>Global Decrement 2</button>
        <button onClick={() => this.props.viewModel.internalIncrement(3)}>Internal Increment 3</button>
        <button onClick={() => this.props.viewModel.internalDecrement(2)}>Internal Decrement 2</button>
        <button onClick={() => this.props.viewModel.save()}>Global save</button>
        <button onClick={() => this.props.viewModel.reload()}>Global reload</button>
        {(this.state.loadingCount === 0) ? null : <p>loading</p>}
      </div>
    )
  }
}

export const CounterContainer: React.StatelessComponent<{}> = () => {

  const viewModel = new CounterViewModelImpl(
    getCountSessionRepository(),
    getCountPersistRepository()
  )

  return (<View
    viewModel={viewModel}
  />)
}