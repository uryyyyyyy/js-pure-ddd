import * as React from 'react'
import TodoItem from '../domain/TodoItem'

interface Props {
  todo: TodoItem
  onComplete: () => void;
}

interface State {
}

export default class Todo extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = { text: ''}
  }

  onToggle = () => this.props.onComplete()

  render() {
    return (
      <div>
        <input
          type="checkbox"
          defaultChecked={this.props.todo.getCompleted()}
          onChange={this.onToggle}
        />
        <span>{this.props.todo.getTitle()}</span>
      </div>
    )
  }
}