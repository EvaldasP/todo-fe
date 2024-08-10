import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private readonly _fb: FormBuilder) {}

  get isFormInvalid(): boolean {
    return this.loginForm?.invalid;
  }

  public onLogin(): void {
    if (this.isFormInvalid) {
      return;
    }
    const payload = this.loginForm.getRawValue();

    console.log(payload);
  }
}
