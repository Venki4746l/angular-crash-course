import { Component } from '@angular/core';
import { Todo } from '../todos/todos.model';

@Component({
  selector: 'app-todo-without-form',
  templateUrl: './todo-without-form.component.html',
  styleUrls: ['./todo-without-form.component.css'],
})
export class TodoWithoutFormComponent {
  EnteredText: string = '';
  count: number = 0;
  selectedTodo: Todo | null = null;
  editStauts: boolean = false;

  public todos: Todo[] = [];
  addTodo() {
    this.count++;
    const newTodo: Todo = {
      id: this.count,
      title: this.EnteredText,
      completed: false,
    };

    this.todos.push(newTodo);
    this.EnteredText = '';
  }

  delete(id: number): void {
    this.todos = this.todos.filter((each) => each.id !== id);
  }
  editTodo(todo: Todo): void {
    this.EnteredText = todo.title;
    this.editStauts = true;
    this.selectedTodo = todo;
  }
  updateTodos() {
    if (this.selectedTodo) {
      const index = this.todos.findIndex(
        (each) => each.id === this.selectedTodo?.id
      );
      if (index !== -1) {
        this.todos[index].title = this.EnteredText;
      }
      this.editStauts = false;
      this.EnteredText = '';
    }
  }

  cancelUpdate() {
    this.editStauts = false;
    this.EnteredText = '';
  }
}
