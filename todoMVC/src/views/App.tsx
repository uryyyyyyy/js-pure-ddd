import * as React from 'react'
import TodoTextInput from './TodoTextInput'
import MainSection from './MainSection'
import Footer from './Footer'
import {TodoListService} from '../services/TodoListService'
import TodoList from '../domain/TodoList'
import {Subscription} from 'rxjs/Subscription'

interface Props {
  todoListService: TodoListService
}

interface State {
  todoList: TodoList
}

export default class App extends React.Component<Props, State> {

  subscription: Subscription
  constructor(props: Props) {
    super(props)
    this.state = {todoList: this.props.todoListService.getToDoList()}
    this.subscription = props.todoListService.getObservable()
      .subscribe(todoList => this.setState({todoList}))
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  addTodo = (title: string) => {
    this.props.todoListService.addTodo(title)
  }

  render() {
    return (
      <div>
        <TodoTextInput onSave={this.addTodo} />
        <MainSection todoListService={this.props.todoListService} />
        <Footer
          totalCount={this.state.todoList.getToDos().length}
          completeCount={this.state.todoList.getCompleteCount()}
        />
      </div>
    )
  }
}