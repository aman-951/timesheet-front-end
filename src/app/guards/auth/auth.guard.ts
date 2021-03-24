import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: TokenService,
    private _utility: UtilityService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._auth.islogin() && this._auth.isTokenValid())
      return true;

    this._auth.logout()
    this._utility.redirectByName('login');
    return false;
  }

}
