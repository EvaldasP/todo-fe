import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { TodoApiService } from '../services/todo-api.service';
import { TodoView } from '../models/todo-view.model';
import { TodoPayload } from '../interfaces/todo.payload';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NotificationMessageType } from 'src/app/shared/enums/notification-message-type.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoFacadeService {
  public readonly todos$: Observable<TodoView[]>;

  private readonly _todosSub$ = new BehaviorSubject<TodoView[]>([]);

  constructor(
    private readonly _todoApiService: TodoApiService,
    private readonly _notificationService: NotificationService
  ) {
    this.todos$ = this._todosSub$.asObservable();
  }

  public loadUserTodos(): void {
    this._todoApiService
      .getUserTodos()
      .pipe(take(1))
      .subscribe({
        next: (todos) => this._todosSub$.next(todos),
        error: (err) =>
          this._notificationService.showMessage(
            err.error?.message,
            NotificationMessageType.Error
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
          this._notificationService.showMessage(
            'Todo Created Sucessfully',
            NotificationMessageType.Success
          );
        },
        error: (err) =>
          this._notificationService.showMessage(
            err.error?.message,
            NotificationMessageType.Error
          ),
      });
  }

  public updateTodoStatus(id: number, isCompleted: boolean): void {
    this._todoApiService
      .updateTodoStatus(id, isCompleted)
      .pipe(take(1))
      .subscribe({
        next: (updatedTodo) => {
          this._todosSub$.next(this.getUpdatedTodos(updatedTodo));
          this._notificationService.showMessage(
            'Todo Updated Sucessfully',
            NotificationMessageType.Success
          );
        },
        error: (err) =>
          this._notificationService.showMessage(
            err.error?.message,
            NotificationMessageType.Error
          ),
      });
  }

  public updateTodo(id: number, payload: TodoPayload): void {
    this._todoApiService
      .updateTodo(id, payload)
      .pipe(take(1))
      .subscribe({
        next: (updatedTodo) => {
          this._todosSub$.next(this.getUpdatedTodos(updatedTodo));
          this._notificationService.showMessage(
            'Todo Updated Sucessfully',
            NotificationMessageType.Success
          );
        },
        error: (err) =>
          this._notificationService.showMessage(
            err.error?.message,
            NotificationMessageType.Error
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
          this._notificationService.showMessage(
            'Todo Deleted Sucessfully',
            NotificationMessageType.Success
          );
        },
        error: (err) =>
          this._notificationService.showMessage(
            err.error?.message,
            NotificationMessageType.Error
          ),
      });
  }

  private getUpdatedTodos(updatedTodo: TodoView): TodoView[] {
    return this._todosSub$
      .getValue()
      .map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
  }
}
