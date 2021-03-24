import { Component, OnInit } from '@angular/core';
import { Login as form } from 'src/app/forms/login';
import { FormBase } from 'src/app/schemas/form-base';
import { Login } from 'src/app/schemas/login';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _service: UserService,
    private _auth: TokenService,
    private _utility: UtilityService
  ) { }

  ngOnInit(): void {
  }

  getFields(): FormBase[] {
    return form
  }

  submit(values: Login): void {
    this._service.login(values).subscribe(res => {
      // @ts-ignore
      this._auth.store(res.data.token).then(status => {
        setTimeout(() => {
          this._utility.redirectByName('dashboard')
        }, 0);
      })
    })
  }

}
