import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({ url: this.prepareUrl(request.url) }));
  }

  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : this.getBaseUrl() + '/' + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }

  private isAbsoluteUrl(url: string): boolean {
    return (/^https?:\/\//i).test(url);
  }

  private getBaseUrl(): string {
    return environment.baseURL;
  }
}
