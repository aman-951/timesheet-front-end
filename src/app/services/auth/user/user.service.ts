import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { APIResponse } from 'src/app/schemas/api-response';
import { ForgotPassword } from 'src/app/schemas/forgot-password';
import { Login } from 'src/app/schemas/login';
import { ResetPassword } from 'src/app/schemas/reset-password';
import { User } from 'src/app/schemas/user';
import { UserRole } from 'src/app/schemas/user-role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  login(params: Login): Observable<APIResponse> {
    return this._http.post<APIResponse>('login', params);
  }

  store(params: User): Observable<APIResponse> {
    return this._http.post<APIResponse>('users', params);
  }

  profile(): Observable<APIResponse> {
    return this._http.get<APIResponse>('profile');
  }

  list(page: number, limit: number): Observable<APIResponse> {
    return this._http.get<APIResponse>('users', {
      params:
        (new HttpParams()).set('page', String(page)).set('limit', String(limit))
    });
  }

  reset_password(params: ResetPassword): Observable<APIResponse> {
    return this._http.post<APIResponse>('reset-password', params);
  }

  forgot_password(params: ForgotPassword): Observable<APIResponse> {
    return this._http.post<APIResponse>('forgot-password', params);
  }

  count(): Observable<APIResponse> {
    return this._http.get<APIResponse>('users/count');
  }

  view(id: string): Observable<APIResponse> {
    return this._http.get<APIResponse>(`users/${id}`);
  }

  put_role(id: string, params: UserRole): Observable<APIResponse> {
    return this._http.put<APIResponse>(`users/${id}/role`, params);
  }
}