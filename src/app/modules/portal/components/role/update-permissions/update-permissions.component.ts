import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBase } from 'src/app/schemas/form-base';
import { RoleService } from 'src/app/services/role/role.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-update-permissions',
  templateUrl: './update-permissions.component.html',
  styleUrls: ['./update-permissions.component.css']
})
export class UpdatePermissionsComponent implements OnInit {

  constructor(
    private _service: RoleService,
    private route: ActivatedRoute,
    private _utility: UtilityService
  ) { }

  form: FormBase[];
  permissions:any;

  ngOnInit(): void {
    if (!this.route.snapshot.paramMap.get('id'))
      return this._utility.redirectByName('roles')

    this.list_permissions()
  }

  view_permissions(id: string): void {
    this._service.view_permissions(id).subscribe(res => {
      let permissions:any = {}
      // @ts-ignore
      for (let doc of res.data)
      // @ts-ignore
      permissions[`permissions[${doc.permission_id}]`] = true

      this.permissions = permissions
    }, err => {
      this._utility.redirectByName('roles')
    })
  }

  list_permissions(): void {
    this._service.list_permissions().subscribe(res => {
      this.generateForm(res.data)
      this.view_permissions(this.route.snapshot.paramMap.get('id'))
    })
  }

  private generateForm(permissions: any): void {
    let form = []
    for (let permission of permissions)
      form.push({
        type: 'checkbox',
        name: `permissions[${permission.id}]`,
        placeholder: `${permission.key} (${permission.description})`
      })

    this.form = form as FormBase[]
  }

  private listCheckedPermission(values: any): number[] {
    let permission = []
    for (let key in values)
      if (values[key])
        permission.push(parseInt(key.replace(/[^\d]+/g, '')))

    return permission
  }

  submit(values: any): void {
    this._service.put_permissions(
      this.route.snapshot.paramMap.get('id'),
      { permissions: this.listCheckedPermission(values) }
    ).subscribe(res => {
      this._utility.redirectByName('roles')
    })
  }

}
