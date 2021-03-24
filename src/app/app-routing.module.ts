import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [{
  path: '', redirectTo: '/dashboard', pathMatch: 'full'
}, {
  path: '',
  loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
}, {
  path: '',
  canActivate: [AuthGuard],
  loadChildren: () => import('./modules/portal/portal.module').then(mod => mod.PortalModule)
}, {
  path: '**',
  redirectTo: '/dashboard'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
