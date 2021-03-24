import { Component, OnInit } from '@angular/core';
import { FormBase } from 'src/app/schemas/form-base';
import { ForgotPassword as form } from 'src/app/forms/forgot-password'
import { ForgotPassword } from 'src/app/schemas/forgot-password';
import { UserService } from 'src/app/services/auth/user/user.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _service: UserService, private _utility: UtilityService) { }

  ngOnInit(): void {
  }

  getFields(): FormBase[] {
    return form
  }

  submit(values: ForgotPassword): void {
    this._service.forgot_password(values).subscribe(res => {
      this._utility.redirectByName('login')
    })
  }

}
