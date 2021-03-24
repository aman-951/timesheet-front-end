import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/schemas/role';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  constructor(private _service: RoleService) { }

  list: Role[] = []

  ngOnInit(): void {
    this.getList()
  }

  getList(): void {
    this._service.list().subscribe(res => {
      // @ts-ignore
      this.list = res.data as Role[]
    })
  }

}
