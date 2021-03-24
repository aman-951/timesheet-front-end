import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  activeReq: number = 0;
  constructor(private _service: UtilityService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.activeReq) {
      this._service.toggleSpinner(true)
      this._service.loaderDisplay(true);
    }

    this.activeReq++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeReq--;
        if (!this.activeReq) {
          this._service.toggleSpinner(false)
          this._service.loaderDisplay(false);
        }
      })
    )
  }
}
