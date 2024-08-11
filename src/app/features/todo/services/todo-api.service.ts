import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoView } from '../models/todo-view.model';
import { TodoPayload } from '../interfaces/todo.payload';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private readonly _baseUrl = 'http://localhost:3000';

  constructor(private readonly _http: HttpClient) {}

  public createTodo(payload: TodoPayload): Observable<TodoView> {
    return this._http.post<TodoView>(`${this._baseUrl}/todos`, payload);
  }

  public getUserTodos(): Observable<TodoView[]> {
    return this._http.get<TodoView[]>(`${this._baseUrl}/todos`);
  }

  public updateTodoStatus(
    id: number,
    isCompleted: boolean
  ): Observable<TodoView> {
    return this._http.patch<TodoView>(`${this._baseUrl}/todos/status/${id}`, {
      isCompleted,
    });
  }

  public updateTodo(id: number, payload: TodoPayload): Observable<TodoView> {
    return this._http.patch<TodoView>(`${this._baseUrl}/todos/${id}`, payload);
  }

  public deleteTodo(id: number): Observable<number> {
    return this._http.delete<number>(`${this._baseUrl}/todos/${id}`);
  }
}
