import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/schemas/pagination';
import { User } from 'src/app/schemas/user';
import { UserService } from 'src/app/services/auth/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private _service: UserService) { }

  list: User[] = []
  pagination: Pagination = {
    limit: 10,
    current_page: 1,
    total: 0
  };

  ngOnInit(): void {
    this.getList()
  }

  getList(): void {
    this._service.list(this.pagination.current_page, this.pagination.limit).subscribe(res => {
      // @ts-ignore
      this.list = res.data.list as User[]
      // @ts-ignore
      delete res.data.list

      // set pagination value
      this.pagination = res.data as Pagination
    })
  }

  setPage(page: number): void {
    this.pagination.current_page = page;
    this.getList()
  }

}
