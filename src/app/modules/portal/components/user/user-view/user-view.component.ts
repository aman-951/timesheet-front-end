import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/schemas/user';
import { UserService } from 'src/app/services/auth/user/user.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _service: UserService,
    private _utility: UtilityService
  ) { }

  ngOnInit(): void {
    this.getDetail(this.route.snapshot.paramMap.get('id'))
  }

  detail: User

  getDetail(id: string): void {
    this._service.view(id).subscribe(res => {
      this.detail = res.data as User
    }, err => {
      this._utility.redirectByName('candidates')
    })
  }

}
