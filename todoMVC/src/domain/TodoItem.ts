import * as uuid from 'uuid'

export default class TodoItem {
  private id: string
  private title: string
  private completed: boolean

  static of(title: string): TodoItem {
    return new TodoItem(uuid.v4(), title, false)
  }

  static clone(todoItem: TodoItem): TodoItem {
    return new TodoItem(todoItem.id, todoItem.title, todoItem.completed)
  }

  constructor(id: string, title: string, completed: boolean) {
    this.id = id
    this.title = title
    this.completed = completed
  }

  finish(): TodoItem {
    const newOne = TodoItem.clone(this)
    newOne.completed = true
    return newOne
  }

  rename(title: string): TodoItem {
    const newOne = TodoItem.clone(this)
    newOne.title = title
    return newOne
  }

  getId(): string {
    return this.id
  }

  getTitle(): string {
    return this.title
  }

  getCompleted(): boolean {
    return this.completed
  }

  _toJSON(): string {
    return JSON.stringify(this)
  }

  static fromJSON(json: string): TodoItem {
    const {id, title, completed} = JSON.parse(json)
    if(id !== undefined && title !== undefined && completed !== undefined) {
      return new TodoItem(id, title, completed)
    }
    throw new Error('parse error')
  }
}