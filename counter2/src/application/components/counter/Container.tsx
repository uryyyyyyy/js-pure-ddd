import 'promise.prototype.finally'
import * as React from 'react'
import 'rxjs/add/operator/skip'
import {getCounterViewModel} from '../../context/context';
import {CounterViewModel, CounterViewModelState} from './ViewModel';
import {Counter} from './Counter';

interface State {
  viewModel: CounterViewModel
  viewModelState: CounterViewModelState
}

export class CounterContainer extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props)
    const viewModel = getCounterViewModel()
    this.state = {
      viewModel: viewModel,
      viewModelState: viewModel.getState()
    }
    viewModel.getStateStream().skip(1).subscribe((viewModelState: CounterViewModelState) => {
      this.setState({viewModelState})
    })
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
