import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const snackBarConfig = (
  type?: 'success' | 'error'
): MatSnackBarConfig => {
  let styleClass = '';

  switch (type) {
    case 'success':
      styleClass = 'success-snackbar';
      break;
    case 'error':
      styleClass = 'error-snackbar';
      break;
    default:
      break;
  }

  return {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: styleClass,
  };
};
