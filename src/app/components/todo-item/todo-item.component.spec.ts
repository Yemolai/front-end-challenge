import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { Todo } from '@/types/todo';
import { FormsModule } from '@angular/forms';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    const todo = new Todo(`test`);
    component.item = todo
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
});
