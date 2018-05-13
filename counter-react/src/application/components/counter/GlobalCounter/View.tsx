import * as React from 'react'
import {ViewModel, CounterViewModel, State} from './ViewModel';
import {getCountPersistRepository, getCountSessionRepository} from '../../../context/context';

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
    this.props.viewModel.reload()
  }

  render() {
    return (
      <div>
        <h2>Global Counter</h2>
        <p>{`global count: ${this.state.count}`}</p>
        <button onClick={() => this.props.viewModel.increment(3)}>Global Increment 3</button>
        <button onClick={() => this.props.viewModel.decrement(2)}>Global Decrement 2</button>
        <button onClick={() => this.props.viewModel.save()}>Global save</button>
        <button onClick={() => this.props.viewModel.reload()}>Global reload</button>
        {(this.state.loadingCount === 0) ? null : <p>loading</p>}
      </div>
    )
  }
}

export const GlobalCounter: React.StatelessComponent<{}> = () => {

  const viewModel = new CounterViewModel(
    getCountSessionRepository(),
    getCountPersistRepository()
  )

  return (<View
    viewModel={viewModel}
  />)
}