import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoCardComponent } from './pages/todo-list/components/todo-card/todo-card.component';
import { TodoFormComponent } from './pages/todo-list/components/todo-form/todo-form.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoApiService } from './services/todo-api.service';

@NgModule({
  declarations: [TodoListComponent, TodoCardComponent, TodoFormComponent],
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  exports: [],
  providers: [TodoApiService],
})
export class TodoModule {}
