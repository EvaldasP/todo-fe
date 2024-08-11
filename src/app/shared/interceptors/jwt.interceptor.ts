import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthFacadeService } from 'src/app/features/auth/facades/auth.facade';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authFacadeService: AuthFacadeService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._authFacadeService.getAccessToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._authFacadeService.logout();
        }
        return throwError(() => new Error('Unauthorized'));
      })
    );
  }
}
