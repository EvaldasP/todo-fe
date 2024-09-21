import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { matchingPasswordsValidator } from 'src/app/shared/validators/matching-passwords.validator';
import { AuthFacadeService } from '../../facades/auth.facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public readonly registerForm = this._fb.group(
    {
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: [''],
    },
    { validators: [matchingPasswordsValidator] }
  );

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _authFacadeService: AuthFacadeService
  ) {}

  get isFormValid(): boolean {
    return this.registerForm.valid;
  }

  public onRegister(): void {
    if (!this.isFormValid) {
      return;
    }

    const { confirmPassword, ...payload } = this.registerForm.getRawValue();

    this._authFacadeService.register(payload);
  }
}
