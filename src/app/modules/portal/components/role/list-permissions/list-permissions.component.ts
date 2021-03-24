import { Component, Input, OnInit } from '@angular/core';
import { Permission } from 'src/app/schemas/Permission';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-list-permissions',
  templateUrl: './list-permissions.component.html',
  styleUrls: ['./list-permissions.component.css']
})
export class ListPermissionsComponent implements OnInit {

  constructor(
    private _service: RoleService
  ) { }

  @Input() id: string;

  list: Permission[]

  ngOnInit(): void {
    this.getDetail(this.id)
  }

  getDetail(id: string): void {
    this._service.view_permissions(id).subscribe(res => {
      this.list = res.data as Permission[]
    })
  }
}
