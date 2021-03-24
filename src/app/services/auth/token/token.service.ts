import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  store(jwtToken: string): Promise<boolean> {
    return new Promise(resolve => {
      sessionStorage.setItem('authorization', jwtToken)
      return resolve(true)
    })
  }

  /**
   * Check if user already login or not
   */
  islogin(): boolean {
    return sessionStorage.authorization;
  }

  /**
   * Method to logout user
   */
  logout(): void {
    sessionStorage.removeItem('authorization');
  }

  /**
   * Method to check if token is valid
   */
  isTokenValid(): boolean {
    return this.calculateTokenValidity() ? true : false;
  }

  calculateTokenValidity(): number {
    return this.decodeToken().exp - Math.floor(Date.now() / 1000);
  }

  getToken(): string {
    return sessionStorage.authorization
  }

  tokenValidity(): number {
    return this.decodeToken().exp;
  }

   decodeToken() {
    let base64Url = this.getToken().split('.')[1],
      base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

    return JSON.parse(base64);
  }
}
