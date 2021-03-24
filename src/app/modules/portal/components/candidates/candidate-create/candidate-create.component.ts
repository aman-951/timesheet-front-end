import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidate as form } from 'src/app/forms/candidate';
import { Candidate } from 'src/app/schemas/candidate';
import { FormBase } from 'src/app/schemas/form-base';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { FileService } from 'src/app/services/file/file.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.css']
})
export class CandidateCreateComponent implements OnInit {

  constructor(
    private _file: FileService,
    private _service: CandidateService,
    private _utility: UtilityService,
    private route: ActivatedRoute,
  ) { }

  detail: Candidate

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id'))
      this.getDetail(this.route.snapshot.paramMap.get('id'))
  }

  getDetail(id: string): void {
    this._service.view(id).subscribe(res => {
      this.detail = res.data as Candidate
    }, err => {
      this._utility.redirectByName('candidates')
    })
  }

  getFields(): FormBase[] {
    return form
  }

  private put(id: string, values: Candidate): void {
    this._service.put(id, values).subscribe(res => {
      this._utility.redirectByName('candidates')
    })
  }

  private post(values: Candidate): void {
    this._service.post(values).subscribe(res => {
      this._utility.redirectByName('candidates')
    })
  }

  private findAction(values: Candidate): void {
    if (this.detail && this.detail.id)
      return this.put(this.detail.id, values)

    this.post(values)
  }

  submit(values: Candidate): void {
    if (values.resume && (typeof values.resume === 'object')) {
      // upload file first    
      this._file.upload(values.resume as File).subscribe(res => {
        // @ts-ignore
        values.resume = res.data.id

        this.findAction(values)
      })
    } else
      this.findAction(values)
  }
}
