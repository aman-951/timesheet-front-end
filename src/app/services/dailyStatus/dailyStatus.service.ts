import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from 'src/app/schemas/api-response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DailyStatusService {

  constructor(private _http: HttpClient) { }

  post(params: any): Observable<APIResponse> {
    return this._http.post<APIResponse>('dailyStatus', params);
  }

 getActivities(task:string, table:string): Observable<APIResponse> {
    return this._http.get<APIResponse>('dailyStatus', {
      params:(new HttpParams()).set('table', table).set('task', task)
    });
  }

   getEmployeesForTask(empId:string, date: string, assignedEmployees:string, table:string): Observable<APIResponse> {
    return this._http.get<APIResponse>('dailyStatus', {
      params:(new HttpParams()).set('date', date).set('empId', empId).set('table', table).set('assignedEmployees', assignedEmployees)
    });
  }

    list(empId:string, date: string, project:string, table:string): Observable<APIResponse> {
    return this._http.get<APIResponse>('dailyStatus', {
      params:(new HttpParams()).set('date', date).set('empId', empId).set('table', table).set('project', project)
    });
  }

 find(client:string, project:string, subProject:string, table:string): Observable<APIResponse> {
    return this._http.get<APIResponse>('dailyStatus', {
      params:(new HttpParams()).set('client', client).set('project', project).set('table', table).set('subProject', subProject)
    });
  }

	reportingEmployees(empId:string): Observable<APIResponse> {
	    return this._http.get<APIResponse>('reportingEmployees', {
	      params:(new HttpParams()).set('empId', empId)
	    });
	  }

   

}