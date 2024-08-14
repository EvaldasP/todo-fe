import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthPayload } from '../interfaces/login-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _baseUrl = 'http://localhost:3000';

  constructor(private readonly _http: HttpClient) {}

  public login(payload: AuthPayload): Observable<{ access_token: string }> {
    return this._http.post<{ access_token: string }>(
      `${this._baseUrl}/auth/login`,
      payload
    );
  }

  public register(payload: AuthPayload): Observable<boolean> {
    return this._http.post<boolean>(`${this._baseUrl}/auth/register`, payload);
  }
}
