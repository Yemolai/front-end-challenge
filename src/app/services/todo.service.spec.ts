import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { Todo } from '@/types/todo';

describe('TodoService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({})
  });

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it('should be able to save item to list', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    const todo = new Todo(`test 1`);
    service.add(todo);
    expect(service.todos).toContain(todo);
    service.clear();
    expect(service.todos)
  })

  it('should be able to remove item from list', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    const todoA = new Todo(`test 1`);
    service.add(todoA);
    expect(service.todos).toContain(todoA);
    const todoB = new Todo(`test 2`);
    service.add(todoB);
    expect(service.todos).toContain(todoB);
    service.remove(todoA);
    expect(service.todos).not.toContain(todoA);
    expect(service.todos).toContain(todoB);
    service.remove(todoB);
    expect(service.todos).not.toContain(todoB);
    expect(service.todos.length).toEqual(0);
  })

  it('should be able to clear the list', () => {
    const size = 5
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    expect(service.todos.length).toEqual(0);
    const todos = new Array(size).fill(0).map((_, idx) => new Todo(`test ${idx}`));
    todos.forEach(todo => service.add(todo));
    expect(service.todos.length).toEqual(size);
    service.clear();
    expect(service.todos.length).toEqual(0);
  })

  it('should be able to clear done todos from list', () => {
    const size = 20
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    const todos = new Array(size).fill(0).map((_, idx) => new Todo(`test ${idx + 1}`, false));
    const pos = Math.floor(Math.random() * size)
    todos[pos].done = true
    todos.forEach(todo => service.add(todo))
    todos.forEach(todo => expect(service.todos).toContain(todo))
    service.clearDone()
    expect(service.todos).not.toContain(todos[pos])
  })

  it('should be able to mark a todo as done', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    service.add(new Todo(`I'm done!`));
    const oldTodo = service.find(`I'm done!`);
    expect(oldTodo).toBeTruthy();
    const newTodo = <Todo>{ ...oldTodo, done: true };
    service.update(oldTodo, newTodo);
    const updatedTodo = service.find(`I'm done!`);
    expect(updatedTodo).toBeTruthy();
    expect(updatedTodo.done).toBe(true);
  })

  it('should be able to update an item', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    const todoA = new Todo(`write the code to pass this test`);
    service.add(todoA);
    expect(service.todos).toContain(todoA);
    const newTodoA = new Todo(todoA.text.toUpperCase(), !todoA.done);
    service.update(todoA, newTodoA);
    expect(service.todos).toContain(newTodoA);
    expect(service.todos).not.toContain(todoA);
  })

  it('should deny registering duplicated todos', () => {
    const text = `write some tests`
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    const todoA = new Todo(text);
    service.add(todoA);
    const todoB = new Todo(text, true);
    try {
      service.add(todoB);
    } catch(err) {
      expect(err).toBeTruthy();
      expect(err.message).toEqual('duplicated');
    }
  })

  it('should deny update with duplicated todo', () => {
    const textA = `write more tests`;
    const textB = `pass all tests`;
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    const todoA = new Todo(textA);
    const todoB = new Todo(textB);
    service.add(todoA);
    service.add(todoB);
    try {
      service.update(todoB, todoA);
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.message).toEqual('duplicated-update');
    }
  })

  it('should persist on localStorage', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    const todo = new Todo(`I required be saved, as I'm in great danger!`);
    service.add(todo);
    expect(service.todos).toContain(todo);
    const todo2 = new Todo(`Sorry your princess is in another castle.`);
    service.add(todo2);
    expect(service.todos).toContain(todo2);
    const serialized = localStorage.getItem(TodoService.STORAGE_KEY);
    expect(serialized).toBeTruthy();
    const savedState = (JSON.parse(serialized) as Todo[])
      .map(({ text, done, createdAt }) => {
        const todo = new Todo(text, done);
        todo.createdAt = createdAt;
        return todo
      });
    expect(savedState).toBeTruthy();
    expect(savedState.length).toEqual(service.todos.length);
    expect(savedState.find(item => todo.isEqual(item))).toBeTruthy();
    expect(savedState.find(item => todo2.isEqual(item))).toBeTruthy();
  });

  it('should return only done/undone', () => {
    const size = 10;
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
    const todos = new Array(size).fill(0).map((_, idx) => new Todo(`test ${idx}`, idx % 2 < 1));
    todos.forEach(todo => service.add(todo))
    const done = todos.filter(todo => todo.done === true)
    const undone = todos.filter(todo => todo.done === false)
    done.forEach(todo => expect(service.done).toContain(todo))
    done.forEach(todo => expect(service.undone).not.toContain(todo))
    undone.forEach(todo => expect(service.undone).toContain(todo))
    undone.forEach(todo => expect(service.done).not.toContain(todo))
  })
});
