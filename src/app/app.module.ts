import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// interceptor
import { BaseUrlInterceptor } from './interceptors/base-url/base-url.interceptor';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
import { LoadingInterceptor } from './interceptors/loading/loading.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
