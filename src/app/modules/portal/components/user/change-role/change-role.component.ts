import { Component, Input, OnInit } from '@angular/core';
import roleOption from 'src/app/castings/role-options';
import { ChangeUserRole as form } from 'src/app/forms/change-user-role';
import { FormBase } from 'src/app/schemas/form-base';
import { Role } from 'src/app/schemas/role';
import { UserRole } from 'src/app/schemas/user-role';
import { UserService } from 'src/app/services/auth/user/user.service';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css']
})
export class ChangeRoleComponent implements OnInit {

  constructor(
    private _role: RoleService,
    private _service: UserService
  ) { }

  @Input() id: string;
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

  submit(values: UserRole): void {
    this._service.put_role(this.id, values).subscribe(res => {
      document.getElementById('closeBtn').click()
    })
  }

}
