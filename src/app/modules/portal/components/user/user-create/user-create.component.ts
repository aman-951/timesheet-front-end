import { Component, OnInit } from '@angular/core';
import roleOption from 'src/app/castings/role-options';
import { User as form } from 'src/app/forms/user';
import { FormBase } from 'src/app/schemas/form-base';
import { Role } from 'src/app/schemas/role';
import { User } from 'src/app/schemas/user';
import { UserService } from 'src/app/services/auth/user/user.service';
import { RoleService } from 'src/app/services/role/role.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor(
    private _role: RoleService,
    private _service:UserService,
    private _utility:UtilityService
  ) { }

  roleForm: FormBase[];

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles(): void {
    this._role.list().subscribe(res => {
      this.roleForm = form(roleOption(res.data as Role[])) as FormBase[]
    })
  }

  getFields(): FormBase[] {
    return this.roleForm
  }

  submit(values: User): void {
    this._service.store(values).subscribe(res => {
      this._utility.redirectByName('users')
    })
  }
}
