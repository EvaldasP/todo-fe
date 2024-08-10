import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { snackBarConfig } from 'src/app/shared/utils/get-snackbar-config';
import { TodoApiService } from '../services/todo-api.service';

@Injectable({
  providedIn: 'root',
})
export class TodoFacadeService {
  constructor(
    private readonly _todoApiService: TodoApiService,
    private readonly _snackBar: MatSnackBar
  ) {}

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
}
