import { Component, OnInit, Output } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.sass']
})
export class TodoInputComponent implements OnInit {

  protected faPlusCircle = faPlusCircle

  protected inputPlaceholder = 'Novo item'

  @Output('submit') submitEvent = new EventEmitter();

  protected text: string = ''

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.submitEvent.emit('submit');
  }

}
