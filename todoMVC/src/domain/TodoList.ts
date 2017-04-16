import TodoItem from './TodoItem'

export default class TodoList {
  private items: Array<TodoItem>

  static initialize(): TodoList {
    return new TodoList([])
  }

  private constructor(items: Array<TodoItem>) {
    this.items = items
  }

  addItem(todoItem: TodoItem): TodoList {
    const list = this.items.concat(todoItem)
    return new TodoList(list)
  }

  getToDos(): Array<TodoItem> {
    return this.items
  }

  getCompleteCount(): number {
    return this.items.filter(item => item.getCompleted()).length
  }

  complete(id: string): TodoList {
    const newList = new TodoList(this.items)
    const idx = newList.getToDos().findIndex(item => item.getId() === id)
    newList.getToDos()[idx] = newList.getToDos()[idx].finish()
    return newList
  }

  _toJSON(): string {
    const jsonTodos = this.getToDos().map(todo => todo._toJSON())
    return JSON.stringify({items: jsonTodos})
  }

  static fromJSON(json: string): TodoList {
    const {items} = JSON.parse(json)
    const todoItems = items.map((plain: string) => TodoItem.fromJSON(plain))
    return new TodoList(todoItems)
  }
}
