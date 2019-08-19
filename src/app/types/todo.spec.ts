import { Todo } from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo(`text`)).toBeTruthy();
  });
  it('should have text and done prop', () => {
    const todoA = new Todo(`task`)
    expect(todoA.done).toEqual(false)
    expect(todoA.text).toEqual(`task`)
    const todoB = new Todo(`task b`, true)
    expect(todoB.text).toEqual(`task b`)
    expect(todoB.done).toEqual(true)
  })
  it('should have timestamp', () => {
    const todo = new Todo(`test task`)
    expect(todo.createdAt).toBeDefined()
  })
});
