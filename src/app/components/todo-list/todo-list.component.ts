import { Component, OnInit, Input, Output } from '@angular/core';
import { Todo } from '@/types/todo';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {

  @Input() list: Todo[]
  @Output() emitter: EventEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  create(text: string) {
    this.emitter.emit('create', new Todo(text))
  }

}
