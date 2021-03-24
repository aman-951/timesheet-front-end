import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/schemas/role';
import { RoleService } from 'src/app/services/role/role.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-role-view',
  templateUrl: './role-view.component.html',
  styleUrls: ['./role-view.component.css']
})
export class RoleViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _service: RoleService,
    private _utility: UtilityService
  ) { }

  ngOnInit(): void {
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

  view_permissions(id: string): void {
    this._service.view_permissions(id).subscribe(res => {
      console.log(res.data);
    })
  }

}
