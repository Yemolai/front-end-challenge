import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.sass']
})
export class TodoInputComponent implements OnInit {

  protected faPlusCircle = faPlusCircle

  protected inputPlaceholder = 'Novo item'

  @Output() submit = new EventEmitter<string>();

  protected text: string = ''

  constructor() { }

  ngOnInit() {
  }

  emitSubmit() {
    this.submit.emit(this.text);
    this.text = ''
  }

}
