import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from './todos.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  public todos: Todo[] = [];
  selectedTodo: Todo | null = null;
  editStatus: boolean = false;
  cancelSatus: boolean = false;

  onSubmit(form: NgForm) {
    if (this.selectedTodo) {
      if (this.cancelSatus === true) {
        form.reset();
        this.editStatus = false;
        this.selectedTodo = null;

        this.cancelSatus = false;
      } else {
        const update = {
          ...this.selectedTodo,
          title: form.value.todo,
        };
        let index = this.todos.findIndex(
          (todo) => todo.id === this.selectedTodo?.id
        );
        this.todos[index] = update;
        form.reset();
        this.editStatus = false;
        this.selectedTodo = null;
      }
    } else {
      const newtodo: Todo = {
        id: this.todos.length,
        title: form.value.todo,
        completed: false,
      };
      this.todos.push(newtodo);
      form.reset();
    }
  }
  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
  markCompleted(id: number): void {
    let index = this.todos.findIndex((todo) => todo.id === id);
    this.todos[index].completed = !this.todos[index].completed;
  }
  updateTodo(id: number, from: NgForm): void {
    const activeTodo = this.todos.find((todo) => todo.id === id);

    if (activeTodo) {
      this.selectedTodo = { ...activeTodo };

      from.setValue({
        todo: activeTodo.title,
      });
      this.editStatus = true;
    }
  }
  cancleUpdate() {
    this.cancelSatus = true;
  }
}
