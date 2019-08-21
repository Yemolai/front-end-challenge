import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '@/types/todo';
import { UpdateTodo } from '@/types/update-todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {

  @Input() list: Todo[]
  @Output() create = new EventEmitter<Todo>()
  @Output() update = new EventEmitter<UpdateTodo>()
  @Output() remove = new EventEmitter<Todo>()

  constructor() {
  }

  ngOnInit() {
  }

  emitCreate(text: string) {
    console.log('create', { text })
    this.create.emit(new Todo(text))
  }

  emitUpdate(updateTodo: UpdateTodo) {
    this.update.emit(updateTodo)
  }

  emitRemove(todo: Todo) {
    this.remove.emit(todo)
  }

}
