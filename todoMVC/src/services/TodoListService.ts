import todoListRepository, {TodoListRepository} from '../infra/TodoListRepository'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import TodoItem from '../domain/TodoItem'
import TodoList from '../domain/TodoList'

export class TodoListService {

  constructor(private todoListRepo: TodoListRepository) {}

  addTodo(title: string): void {
    const list = this.todoListRepo.getToDos()
    const todo = TodoItem.of(title)
    const newList = list.addItem(todo)
    this.todoListRepo.save(newList)
  }

  getToDoList(): TodoList {
    return this.todoListRepo.getToDos()
  }

  getObservable(): Observable<TodoList> {
    return this.todoListRepo.subject
  }

  complete(id: string): void {
    const newList = this.getToDoList().complete(id)
    this.todoListRepo.save(newList)
  }
}

// singleton
export default new TodoListService(todoListRepository)