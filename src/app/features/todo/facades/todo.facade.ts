import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { snackBarConfig } from 'src/app/shared/utils/get-snackbar-config';
import { TodoApiService } from '../services/todo-api.service';
import { TodoView } from '../models/todo-view.model';

@Injectable({
  providedIn: 'root',
})
export class TodoFacadeService {
  public readonly todos$: Observable<TodoView[]>;

  private readonly _todosSub$ = new BehaviorSubject<TodoView[]>([]);

  constructor(
    private readonly _todoApiService: TodoApiService,
    private readonly _snackBar: MatSnackBar
  ) {
    this.todos$ = this._todosSub$.asObservable();
  }

  public loadUserTodos(): void {
    this._todoApiService
      .getUserTodos()
      .pipe(take(1))
      .subscribe({
        next: (todos) => {
          console.log(todos);
          this._todosSub$.next(todos);
        },
        error: (err) =>
          this._snackBar.open(
            err.error.message || 'Login failed',
            'Close',
            snackBarConfig('error')
          ),
      });
  }

  public createTodo(title: string): void {
    this._todoApiService
      .createTodo(title)
      .pipe(take(1))
      .subscribe({
        next: (todo) => {
          console.log(todo);
        },
        error: (err) =>
          this._snackBar.open(
            err.error.message || 'Login failed',
            'Close',
            snackBarConfig('error')
          ),
      });
  }

  public deleteTodo(id: number): void {
    this._todoApiService
      .deleteTodo(id)
      .pipe(take(1))
      .subscribe({
        next: (todo) => {
          console.log(todo);
        },
        error: (err) =>
          this._snackBar.open(
            err.error.message || 'Login failed',
            'Close',
            snackBarConfig('error')
          ),
      });
  }
}
