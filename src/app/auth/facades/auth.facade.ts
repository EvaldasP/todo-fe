import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginPayload } from '../interfaces/login-payload.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  constructor(
    private readonly _authApiService: AuthApiService,
    private readonly _router: Router,
    private readonly _jwtHelper: JwtHelperService,
    private readonly _snackBar: MatSnackBar
  ) {}

  get isLoggedIn(): boolean {
    const token = this.getAccessToken();

    return !this._jwtHelper.isTokenExpired(token);
  }

  public login(payload: LoginPayload): void {
    this._authApiService
      .login(payload)
      .pipe(take(1))
      .subscribe({
        next: ({ access_token }) => {
          localStorage.setItem('access_token', access_token);
        },
        error: (err) =>
          this._snackBar.open(err.error.message || 'Login failed', 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          }),
      });
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this._router.navigate(['login']);
  }
}
