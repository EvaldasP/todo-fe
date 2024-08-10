import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoView } from '../models/todo-view.model';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private readonly _baseUrl = 'http://localhost:3000';

  constructor(private readonly _http: HttpClient) {}

  public createTodo(title: string): Observable<TodoView> {
    return this._http.post<TodoView>(`${this._baseUrl}/todos`, { title });
  }
}
