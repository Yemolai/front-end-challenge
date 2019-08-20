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

  get undone() {
    return this.__todos.filter(todo => todo.done !== true)
  }

  get done() {
    return this.__todos.filter(todo => todo.done === true)
  }

  protected save() {
    const serializedState = JSON.stringify(this.__todos)
    localStorage.setItem(TodoService.STORAGE_KEY, serializedState)
  }

  find(text: string) {
    return this.__todos
      .find(todo => todo.text.toLocaleLowerCase() === text.toLocaleLowerCase())
  }

  add(newTodo: Todo) {
    const duplicated = this.find(newTodo.text)
    if (duplicated) {
      throw new Error('duplicated')
    }
    this.__todos = [...this.__todos, newTodo]
    this.save()
  }

  update(oldTodo: Todo, newTodo: Todo) {
    const listWithoutThisItem = this.__todos
      .filter(todo => todo.text.toLocaleLowerCase() !== oldTodo.text.toLocaleLowerCase())
    const duplicated = listWithoutThisItem
      .find(todo => todo.text.toLocaleLowerCase() === newTodo.text.toLocaleLowerCase())
    if (duplicated) {
      throw new Error('duplicated-update')
    }
    this.__todos = [...listWithoutThisItem, newTodo]
    this.save()
  }

  mark(text: string, done = true) {
    const todo = this.find(text)
    if (!todo) {
      throw new Error('not-found')
    }
    this.update(todo, <Todo>{...todo, done})
  }

  remove(selectedTodo: Todo) {
    const listWithoutThisItem = this.__todos
      .filter(todo => todo.text !== selectedTodo.text)
    this.__todos = listWithoutThisItem
    this.save()
  }

  clear() {
    this.__todos = []
    this.save()
  }

  clearDone() {
    this.__todos = this.__todos.filter(todo => todo.done !== true)
    this.save()
  }
}
