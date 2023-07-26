import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { TodosComponent } from './todos/todos.component';
import { HomeComponent } from './home/home.component';
import { TodoWithoutFormComponent } from './todo-without-form/todo-without-form.component';
 //import { CounterComponent } from './counter/counter.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todo', component: TodosComponent },
  {
    path: 'todowithoutform',
    component: TodoWithoutFormComponent,
    pathMatch: 'full',
  },
  // { path: 'counter', component: CounterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
