import { UpdateTodo } from './update-todo';
import { Todo } from './todo';

describe('UpdateTodo', () => {
  it('should have newTodo and oldTodo', () => {
    const oldTodo = new Todo(`old`)
    const newTodo = new Todo(`new`)
    const updateTodo = <UpdateTodo>{ oldTodo, newTodo }
    expect(updateTodo).toBeTruthy();
    expect(updateTodo.oldTodo).toEqual(oldTodo);
    expect(updateTodo.newTodo).toEqual(newTodo);
  })
});
