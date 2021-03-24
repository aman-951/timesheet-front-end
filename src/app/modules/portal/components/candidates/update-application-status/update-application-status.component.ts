import { Component, Input, OnInit } from '@angular/core';
import statusOption from 'src/app/castings/status-options';
import { ChangeApplicationStatus as form } from 'src/app/forms/change-application-status';
import { CandidateApplicationStatus } from 'src/app/schemas/candidate-application-status';
import { FormBase } from 'src/app/schemas/form-base';
import { Status } from 'src/app/schemas/status';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-update-application-status',
  templateUrl: './update-application-status.component.html',
  styleUrls: ['./update-application-status.component.css']
})
export class UpdateApplicationStatusComponent implements OnInit {

  constructor(
    private _status: StatusService,
    private _service: CandidateService
  ) { }

  @Input() id: string

  statusForm: FormBase[];

  ngOnInit(): void {
    this.getList()
  }

  getList(): void {
    this._status.list(1, 1000).subscribe(res => {
      // @ts-ignore
      this.statusForm = form(statusOption(res.data.list as Status[])) as FormBase[]
    })
  }

  getFields(): FormBase[] {
    return this.statusForm
  }

  submit(values: CandidateApplicationStatus): void {
    this._service.put_status(this.id, values).subscribe(res => {
      document.getElementById('app-close-btn').click()
    })
  }

}
