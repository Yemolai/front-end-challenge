import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '@/types/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass']
})
export class TodoItemComponent implements OnInit {

  @Input() item: Todo

  protected get text () {
    return `${this.item.text}`.trim()
  }

  protected get done () {
    return this.item.done === true
  }

  constructor() { }

  ngOnInit() {
  }

}
