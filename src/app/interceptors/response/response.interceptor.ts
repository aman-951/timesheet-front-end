import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(
    private _auth: TokenService,
    private _utility: UtilityService,
    private _notification: NotificationService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && ([200, 201].includes(event.status)))
          this._notification.displayNotification(event.body.message, 'success')
          console.log(request.headers);
          
      }), catchError((err: HttpErrorResponse) => {
        this._notification.displayNotification(err.error.message, 'error')
        if (err.status === 401) {
          this._auth.logout();
          this._utility.redirectByName('login')
        }
        return throwError(err.error || err.statusText);
      })
    );
  }
}
