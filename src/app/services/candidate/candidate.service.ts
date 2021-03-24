import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { APIResponse } from 'src/app/schemas/api-response';
import { Candidate } from 'src/app/schemas/candidate';
import { CandidateApplicationStatus } from 'src/app/schemas/candidate-application-status';
import { Email } from 'src/app/schemas/email';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private _http: HttpClient) { }

  post(params: Candidate): Observable<APIResponse> {
    return this._http.post<APIResponse>('candidates', params);
  }

  put(id: string, params: Candidate): Observable<APIResponse> {
    return this._http.put<APIResponse>(`candidates/${id}`, params);
  }

  list(page: number, limit: number): Observable<APIResponse> {
    return this._http.get<APIResponse>('candidates', {
      params:
        (new HttpParams()).set('page', String(page)).set('limit', String(limit))
    });
  }

  count(): Observable<APIResponse> {
    return this._http.get<APIResponse>('candidates/count');
  }

  view(id: string): Observable<APIResponse> {
    return this._http.get<APIResponse>(`candidates/${id}`);
  }

  list_status(id: string): Observable<APIResponse> {
    return this._http.get<APIResponse>(`candidates/${id}/status`);
  }

  put_status(id: string, params: CandidateApplicationStatus): Observable<APIResponse> {
    return this._http.put<APIResponse>(`candidates/${id}/status`, params);
  }

  share(id: string, params: Email): Observable<APIResponse> {
    return this._http.post<APIResponse>(`candidates/${id}/share`, params);
  }
}
