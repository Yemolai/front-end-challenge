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

  it('should compare objects', () => {
    const todoA = new Todo(`test 1`);
    const todoB = new Todo(`test 2`);
    const todoC = new Todo(todoA.text, todoA.done);
    todoC.createdAt = todoA.createdAt;
    expect(todoA.isEqual(todoB)).toBeFalsy();
    expect(todoA.isEqual(todoC)).toBeTruthy();
  })
});
