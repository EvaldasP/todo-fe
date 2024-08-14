import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchingPasswordsValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ matchingPasswords: true });
    return { matchingPasswords: true };
  } else {
    confirmPassword.setErrors(null);
    return null;
  }
}
