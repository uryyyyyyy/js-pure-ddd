import * as React from 'react'
import {TodoListService} from '../services/TodoListService'
import TodoList from '../domain/TodoList'
import Todo from './Todo'
import TodoItem from '../domain/TodoItem'
import {Subscription} from "rxjs/Subscription"

interface Props {
  todoListService: TodoListService
}

interface State {
  todoList: TodoList
}

export default class MainSection extends React.Component<Props, State> {

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

  complete = (id: string) => {
    this.props.todoListService.complete(id)
  }

  render() {
    return (
      <section id="main">
        <ul>{
          this.state.todoList.getToDos()
            .map((todo: TodoItem) => <Todo
              key={todo.getId()}
              todo={todo}
              onComplete={() => this.complete(todo.getId())}
            />)
        }</ul>
      </section>
    )
  }
}