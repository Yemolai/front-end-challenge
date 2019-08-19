import { Injectable } from '@angular/core';
import { Todo } from '@/types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  static STORAGE_KEY = 'todos'
  protected __todos: Todo[] = []

  constructor() {
    const savedSerializedState = localStorage.getItem('todos')
    const savedState = JSON.parse(savedSerializedState || '[]')
    this.__todos = savedState
  }

  get todos() {
    return this.__todos
  }

  protected save() {
    const serializedState = JSON.stringify(this.__todos)
    localStorage.setItem(TodoService.STORAGE_KEY, serializedState)
  }

  add(newTodo: Todo) {
    const duplicated = this.__todos.find(todo => todo.text.toLowerCase() === newTodo.text)
    if (duplicated) {
      throw new Error('duplicated')
    }
    this.__todos = [...this.__todos, newTodo]
    this.save()
  }

  update(oldTodo: Todo, newTodo: Todo) {
    const listWithoutThisItem = this.__todos.filter(todo => todo.text !== oldTodo.text)
    const duplicated = listWithoutThisItem.find(todo => todo.text === newTodo.text)
    if (duplicated) {
      throw new Error('duplicated-update')
    }
    this.__todos = [...listWithoutThisItem, newTodo]
    this.save()
  }

  remove(selectedTodo: Todo) {
    const listWithoutThisItem = this.__todos.filter(todo => todo.text !== selectedTodo.text)
    this.__todos = listWithoutThisItem
    this.save()
  }

  clear() {
    this.__todos = []
    this.save()
  }
}
