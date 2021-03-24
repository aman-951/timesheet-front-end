import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { APIResponse } from 'src/app/schemas/api-response';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _http: HttpClient) { }

  upload(file: File): Observable<APIResponse> {
    let formData = new FormData()
    formData.append('file', file)
    return this._http.post<APIResponse>('uploads', formData);
  }

  getFileUrl(id: string): string {
    return `http://127.0.0.1:3000/uploads/${id}/files`
  }

  view(id: string): Observable<APIResponse> {
    return this._http.get<APIResponse>(`uploads/${id}`);
  }
}
