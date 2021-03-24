import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
    path: 'login',
    component: LoginComponent
  }, {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }, {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
