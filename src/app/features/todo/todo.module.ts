import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoCardComponent } from './pages/todo-list/components/todo-card/todo-card.component';
import { TodoFormComponent } from './pages/todo-list/components/todo-form/todo-form.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoListComponent, TodoCardComponent, TodoFormComponent],
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  exports: [],
  providers: [],
})
export class TodoModule {}
