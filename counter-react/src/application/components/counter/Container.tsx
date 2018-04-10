import 'promise.prototype.finally'
import * as React from 'react'
import 'rxjs/add/operator/skip'
import {getCountPersistRepository, getCountSessionRepository} from '../../context/context';
import {CounterViewModel, CounterViewModelImpl, CounterViewModelState} from './ViewModel';
import {Counter} from './Counter';

interface State {
  viewModel: CounterViewModel
  viewModelState: CounterViewModelState
}

export class CounterContainer extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props)
    const viewModel = new CounterViewModelImpl(
      getCountSessionRepository(),
      getCountPersistRepository()
    )
    this.state = {
      viewModel: viewModel,
      viewModelState: viewModel.getState()
    }
    viewModel.getStateStream().skip(1)
      .subscribe(viewModelState => this.setState({viewModelState}))
  }

  componentWillMount(){
    this.state.viewModel.reload()
  }

  render(){
    return (<Counter
      viewModel={this.state.viewModel}
      state={this.state.viewModelState}
    />)
  }
}
