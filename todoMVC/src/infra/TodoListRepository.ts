
import {Subject} from 'rxjs/Subject'
import TodoList from '../domain/TodoList'

const todosKey = 'TODO_KEY'

export class TodoListRepository {

  subject: Subject<TodoList>

  constructor(private storage: Storage) {
    this.subject = new Subject()
    if(!this.storage.getItem(todosKey)){
      const json = TodoList.initialize()._toJSON()
      this.storage.setItem(todosKey, json)
    }
  }

  save(todoList: TodoList): void {
    const json = todoList._toJSON()
    this.storage.setItem(todosKey, json)
    this.subject.next(todoList)
  }

  /**
   * 取得するよ
   */
  getToDos(): TodoList {
    const json = this.storage.getItem(todosKey)
    if(json == null){
      this.storage.setItem(todosKey, '[]')
      return TodoList.initialize()
    }
    return TodoList.fromJSON(json)
  }
}

// singleton
export default new TodoListRepository(sessionStorage)