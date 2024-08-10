import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload } from '../interfaces/login-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _baseUrl = 'http://localhost:3000';

  constructor(private readonly _http: HttpClient) {}

  public login(payload: LoginPayload): Observable<{ access_token: string }> {
    return this._http.post<{ access_token: string }>(
      `${this._baseUrl}/auth/login`,
      payload
    );
  }
}
