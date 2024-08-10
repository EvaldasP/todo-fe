import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoCardComponent } from './pages/todo-list/components/todo-card/todo-card.component';
import { TodoFormComponent } from './pages/todo-list/components/todo-form/todo-form.component';

@NgModule({
  declarations: [TodoListComponent, TodoCardComponent, TodoFormComponent],
  imports: [CommonModule],
  exports: [],
  providers: [],
})
export class TodoModule {}
