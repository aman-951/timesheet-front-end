import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/schemas/candidate';
import { Pagination } from 'src/app/schemas/pagination';
import { UserService } from 'src/app/services/auth/user/user.service';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { FileService } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  constructor(
    private _service: CandidateService,
    private _file: FileService
  ) { }

  list: Candidate[] = []
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
      this.list = res.data.list
      // @ts-ignore
      delete res.data.list

      // set pagination value
      this.pagination = res.data as Pagination
    })
  }

  getName(item: Candidate): string {
    return `${item.first_name} ${item.middle_name || ''} ${item.last_name}`
  }

  getResumeUrl(id: string | File): string {
    if (typeof id === 'string')
      return this._file.getFileUrl(id)
    return null
  }

  setPage(page: number): void {
    this.pagination.current_page = page;
    this.getList()
  }
}