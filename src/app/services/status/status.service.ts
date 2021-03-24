import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { APIResponse } from 'src/app/schemas/api-response';
import { Status } from 'src/app/schemas/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private _http: HttpClient) { }

  post(params: Status): Observable<APIResponse> {
    return this._http.post<APIResponse>('statuses', params);
  }

  list(page: number, limit: number): Observable<APIResponse> {
    return this._http.get<APIResponse>('statuses', {
      params:
        (new HttpParams()).set('page', String(page)).set('limit', String(limit))
    });
  }
}
