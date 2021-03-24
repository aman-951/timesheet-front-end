import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: { 'class': 'ml-auto' }
})
export class HeaderComponent implements OnInit {

  constructor(private _service: TokenService, private _utility: UtilityService, private _user: UserService) { }

  profile: any;

  ngOnInit(): void {
    // this.getProfile()
  }

  getProfile(): void {
    this._user.profile().subscribe(res => {
      this.profile = res.data
    })
  }

  toggleDropDown(e: any): void {
    e.target.closest('.dropdown').querySelector('.dropdown-menu').classList.toggle('show');
  }

  logout(): void {
    this._service.logout()
    this._utility.redirectByName('login')
  }

  hideNav(e: any): void {
    console.log(e.target.classList);

    e.target.closest('.dropdown-menu').classList.remove('show')
  }

}
