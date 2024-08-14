import { Component } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { matchingPasswordsValidator } from 'src/app/shared/validators/matching-passwords.validator';

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

  constructor(private readonly _fb: NonNullableFormBuilder) {}

  get isFormValid(): boolean {
    return this.registerForm.valid;
  }
}
