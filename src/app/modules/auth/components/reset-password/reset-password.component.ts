import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword as form } from 'src/app/forms/reset-password';
import { FormBase } from 'src/app/schemas/form-base';
import { ResetPassword } from 'src/app/schemas/reset-password';
import { UserService } from 'src/app/services/auth/user/user.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private _service: UserService,
    private _utilty: UtilityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  getFields(): FormBase[] {
    return form
  }

  submit(values: ResetPassword): void {
    values.token = this.route.snapshot.paramMap.get('token').trim()
    this._service.reset_password(values).subscribe(res => {
      this._utilty.redirectByName('login')
    })
  }

}
