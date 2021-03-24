import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from 'src/app/schemas/api-response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private _http: HttpClient) { }

  post(params: any): Observable<APIResponse> {
    return this._http.post<APIResponse>('timesheet', params);
  }

    list(empId:string, from: string, to: string): Observable<APIResponse> {
    return this._http.get<APIResponse>('timesheet', {
      params:(new HttpParams()).set('from', from).set('to', to).set('empId', empId)
    });
  }

   swipe(empId:string, from: string, to: string): Observable<APIResponse> {
    return this._http.get<APIResponse>('swipe', {
      params:(new HttpParams()).set('from', from).set('to', to).set('empId', empId)
    });
  }

   approvalList(managerId:string, from: string, to: string, table:string): Observable<APIResponse> {
    return this._http.get<APIResponse>('approvalList', {
      params:(new HttpParams()).set('managerId', managerId).set('from', from).set('to', to).set('table', table)
    });
  }

}