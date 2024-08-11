import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationMessageType } from '../enums/notification-message-type.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  public showMessage(msg: string, type?: NotificationMessageType): void {
    this._snackBar.open(
      msg || 'An unexpected error occurred',
      'Close',
      this.getSnackBarConfig(type)
    );
  }

  private getSnackBarConfig(type?: NotificationMessageType): MatSnackBarConfig {
    return {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type ? `${type}-snackbar` : '',
    };
  }
}
