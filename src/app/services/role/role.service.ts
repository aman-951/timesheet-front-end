import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { APIResponse } from 'src/app/schemas/api-response';
import { Role } from 'src/app/schemas/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient) { }

  list(): Observable<APIResponse> {
    return this._http.get<APIResponse>('roles');
  }

  store(params: Role): Observable<APIResponse> {
    return this._http.post<APIResponse>('roles', params);
  }

  view(id: string): Observable<APIResponse> {
    return this._http.get<APIResponse>(`roles/${id}`);
  }

  view_permissions(id: string): Observable<APIResponse> {
    return this._http.get<APIResponse>(`roles/${id}/permissions`);
  }

  put(id: string, params: Role): Observable<APIResponse> {
    return this._http.put<APIResponse>(`roles/${id}`, params);
  }

  list_permissions(): Observable<APIResponse> {
    return this._http.get<APIResponse>(`permissions`);
  }

  put_permissions(id: string, params: any): Observable<APIResponse> {
    return this._http.put<APIResponse>(`roles/${id}/permissions`, params);
  }
}
