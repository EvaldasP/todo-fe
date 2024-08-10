import { Component, OnInit } from '@angular/core';
import { TodoFacadeService } from '../../facades/todo.facade';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public readonly todos$ = this._todoFacadeService.todos$;

  constructor(private readonly _todoFacadeService: TodoFacadeService) {}

  public ngOnInit(): void {
    this._todoFacadeService.loadUserTodos();
  }
}
