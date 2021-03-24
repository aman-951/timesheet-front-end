import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/auth/token/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _service: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers: any = {}

    if (this._service.islogin() && this._service.isTokenValid())
      headers['authorization'] = this._service.getToken()

    return next.handle(request.clone({
      setHeaders: headers
    }));
  }
}
