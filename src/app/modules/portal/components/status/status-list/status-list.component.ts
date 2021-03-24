import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/schemas/pagination';
import { Status } from 'src/app/schemas/status';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {

  constructor(private _service:StatusService) { }

  ngOnInit(): void {
    this.getList()
  }

  list: Status[] = []
  pagination: Pagination = {
    limit: 10,
    current_page: 1,
    total: 0
  };

  getList(): void {
    this._service.list(this.pagination.current_page, this.pagination.limit).subscribe(res => {
      // @ts-ignore
      this.list = res.data.list
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
