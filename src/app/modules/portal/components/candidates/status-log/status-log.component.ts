import { Component, Input, OnInit } from '@angular/core';
import { CandidateApplicationStatus } from 'src/app/schemas/candidate-application-status';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-status-log',
  templateUrl: './status-log.component.html',
  styleUrls: ['./status-log.component.css']
})
export class StatusLogComponent implements OnInit {

  constructor(private _service: CandidateService) { }

  applicationStatuses: CandidateApplicationStatus[]

  ngOnInit(): void {
    this.status(this.id)
  }

  @Input() id: string;

  status(id: string): void {
    this._service.list_status(id).subscribe(res => {
      this.applicationStatuses = res.data as CandidateApplicationStatus[]
    })
  }

}
