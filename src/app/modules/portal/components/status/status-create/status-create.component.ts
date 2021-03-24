import { Component, OnInit } from '@angular/core';
import { Status as form } from 'src/app/forms/status';
import { FormBase } from 'src/app/schemas/form-base';
import { Status } from 'src/app/schemas/status';
import { StatusService } from 'src/app/services/status/status.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-status-create',
  templateUrl: './status-create.component.html',
  styleUrls: ['./status-create.component.css']
})
export class StatusCreateComponent implements OnInit {

  constructor(
    private _service: StatusService,
    private _utility: UtilityService
  ) { }

  ngOnInit(): void {
  }

  getFields(): FormBase[] {
    return form
  }

  submit(values: Status): void {
    this._service.post(values).subscribe(res => {
      this._utility.redirectByName('statuses')
    })
  }

}
