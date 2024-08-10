import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthFacadeService } from '../../facades/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public readonly loginForm = this._fb.group({
    username: this._fb.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: this._fb.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authFacadeService: AuthFacadeService
  ) {}

  get isFormInvalid(): boolean {
    return this.loginForm?.invalid;
  }

  public onLogin(): void {
    if (this.isFormInvalid) {
      return;
    }
    const payload = this.loginForm.getRawValue();

    this._authFacadeService.login(payload);
  }
}
