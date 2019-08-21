import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './types/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Front end Challenge';

  constructor(private todoService: TodoService) { }

  get list () {
    return this.todoService.todos
  }

  newTodo(todo: Todo) {
    console.log('newTodo', { todo })
    this.todoService.add(todo)
  }

  updateTodo({ oldTodo, newTodo }: { oldTodo: Todo, newTodo: Todo }) {
    this.todoService.update(oldTodo, newTodo)
  }

  removeTodo(todo: Todo) {
    this.todoService.remove(todo)
  }
}
