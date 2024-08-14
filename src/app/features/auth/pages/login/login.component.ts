import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
    }),
    password: this._fb.control('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _authFacadeService: AuthFacadeService
  ) {}

  get isFormValid(): boolean {
    return this.loginForm?.valid;
  }

  public onLogin(): void {
    if (!this.isFormValid) {
      return;
    }
    const payload = this.loginForm.getRawValue();

    this._authFacadeService.login(payload);
  }
}
