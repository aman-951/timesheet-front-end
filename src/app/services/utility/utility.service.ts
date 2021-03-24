import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _route: Router) { }

  public spinnerStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public formResetStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  redirect(route: string): void {
    this._route.navigate([route]);
  }

  // update status of the loader
  toggleSpinner(status: boolean): void {
    this.spinnerStatus.next(status);
  }

  resetForm(status: boolean): void {
    this.formResetStatus.next(status);
  }

  redirectByName(name: string): void {
    let routes: any = {
      login: '/login', dashboard: '/dashboard', candidates: '/candidates', users: '/users',
      roles: '/roles', statuses: '/application-statuses'
    }

    if (Object.keys(routes).includes(name.trim().toLowerCase()))
      this.redirect(routes[name.trim().toLowerCase()])
  }

  // update status of the loader
  loaderDisplay(status: boolean): void {
    this.loaderStatus.next(status);
  }
}
