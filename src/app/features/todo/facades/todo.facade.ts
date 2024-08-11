import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { snackBarConfig } from 'src/app/shared/utils/get-snackbar-config';
import { TodoApiService } from '../services/todo-api.service';
import { TodoView } from '../models/todo-view.model';
import { TodoPayload } from '../interfaces/todo.payload';

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

  public createTodo(payload: TodoPayload): void {
    this._todoApiService
      .createTodo(payload)
      .pipe(take(1))
      .subscribe({
        next: (todo) => {
          this._todosSub$.next([...this._todosSub$.getValue(), todo]);
          this._snackBar.open(
            'Created todo successfully',
            'Close',
            snackBarConfig('success')
          );
        },
        error: (err) =>
          this._snackBar.open(
            err.error.message,
            'Close',
            snackBarConfig('error')
          ),
      });
  }

  public updateTodoStatus(id: number, isCompleted: boolean): void {
    this._todoApiService
      .updateTodoStatus(id, isCompleted)
      .pipe(take(1))
      .subscribe({
        next: (updatedTodo) => {
          this._todosSub$.next(
            this._todosSub$
              .getValue()
              .map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
          );
        },
        error: (err) =>
          this._snackBar.open(
            err.error.message,
            'Close',
            snackBarConfig('error')
          ),
      });
  }

  public updateTodo(id: number, payload: TodoPayload): void {
    this._todoApiService
      .updateTodo(id, payload)
      .pipe(take(1))
      .subscribe({
        next: (updatedTodo) => {
          this._todosSub$.next(
            this._todosSub$
              .getValue()
              .map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
          );
        },
        error: (err) =>
          this._snackBar.open(
            err.error.message,
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
        next: (todoId) => {
          this._todosSub$.next(
            this._todosSub$.getValue().filter((todo) => todo.id !== todoId)
          );
          this._snackBar.open(
            'Deleted Todo Successfully',
            'Close',
            snackBarConfig('success')
          );
        },
        error: (err) =>
          this._snackBar.open(
            err.error.message,
            'Close',
            snackBarConfig('error')
          ),
      });
  }
}
