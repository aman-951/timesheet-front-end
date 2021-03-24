import { Component, Input, OnInit } from '@angular/core';
import { CandidateApplicationShare as form } from 'src/app/forms/candidate-application-share';
import { Email } from 'src/app/schemas/email';
import { FormBase } from 'src/app/schemas/form-base';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-share-candidate',
  templateUrl: './share-candidate.component.html',
  styleUrls: ['./share-candidate.component.css']
})
export class ShareCandidateComponent implements OnInit {

  constructor(private _service: CandidateService) { }

  @Input() id: string

  ngOnInit(): void {
  }

  getFields(): FormBase[] {
    return form
  }

  submit(values: Email): void {
    this._service.share(this.id, values).subscribe(res => {
      document.getElementById('share-btn-close').click()
    })
  }

}
