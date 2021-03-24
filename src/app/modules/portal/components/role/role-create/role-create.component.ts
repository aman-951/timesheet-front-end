import { Component, OnInit } from '@angular/core';
import { FormBase } from 'src/app/schemas/form-base';
import { Role } from 'src/app/schemas/role';
import { Role as form } from 'src/app/forms/role';
import { RoleService } from 'src/app/services/role/role.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  constructor(
    private _service: RoleService,
    private _utility: UtilityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id'))
      this.getDetail(this.route.snapshot.paramMap.get('id'))
  }

  detail: Role

  getDetail(id: string): void {
    this._service.view(id).subscribe(res => {
      this.detail = res.data as Role
    }, err => {
      this._utility.redirectByName('candidates')
    })
  }

  getFields(): FormBase[] {
    return form
  }

  private post(values: Role): void {
    this._service.store(values).subscribe(res => {
      this._utility.redirectByName('roles')
    })
  }

  private put(id: string, values: Role): void {
    this._service.put(id, values).subscribe(res => {
      this._utility.redirectByName('roles')
    })
  }

  submit(values: Role): void {
    if (this.detail && this.detail.id)
      return this.put(this.detail.id, values)

    return this.post(values)

  }

}
