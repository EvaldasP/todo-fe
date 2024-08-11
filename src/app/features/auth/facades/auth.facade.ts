import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginPayload } from '../interfaces/login-payload.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/utils/get-snackbar-config';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  public readonly isLoggedIn$: Observable<boolean>;

  private readonly isLoggedInSub$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _authApiService: AuthApiService,
    private readonly _router: Router,
    private readonly _jwtHelper: JwtHelperService,
    private readonly _snackBar: MatSnackBar
  ) {
    this.isLoggedIn$ = this.isLoggedInSub$.asObservable();

    if (this.isTokenValid) {
      this.isLoggedInSub$.next(true);
    }
  }

  get isTokenValid(): boolean {
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
          this.isLoggedInSub$.next(true);
          this._router.navigate(['todos']);
        },
        error: (err) =>
          this._snackBar.open(
            err.error.message || 'Login failed',
            'Close',
            snackBarConfig('error')
          ),
      });
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public logout(): void {
    this.isLoggedInSub$.next(false);
    localStorage.removeItem('access_token');
    this._router.navigate(['login']);
  }
}
