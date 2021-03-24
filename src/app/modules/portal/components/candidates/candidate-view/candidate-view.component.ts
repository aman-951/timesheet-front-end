import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from 'src/app/schemas/candidate';
import { UploadFile } from 'src/app/schemas/upload-file';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { FileService } from 'src/app/services/file/file.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.css']
})
export class CandidateViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _service: CandidateService,
    private _file: FileService,
    private _utility:UtilityService
  ) { }

  detail: Candidate
  resume: UploadFile

  ngOnInit(): void {
    this.getDetail(this.route.snapshot.paramMap.get('id'))
  }

  getDetail(id: string): void {
    this._service.view(id).subscribe(res => {
      this.detail = res.data as Candidate
      if (this.detail.resume && (typeof this.detail.resume === 'string'))
        this.resumeDetail(this.detail.resume)
    }, err => {
      this._utility.redirectByName('candidates')
    })
  }

  getName(): string {
    return this.detail ? `${this.detail.first_name} ${this.detail.middle_name || ''} ${this.detail.last_name}` : null
  }

  getResumeUrl(id: string | File): string {
    if (typeof id === 'string')
      return this._file.getFileUrl(id)
    return null
  }

  resumeDetail(id: string): void {
    this._file.view(id).subscribe(res => {
      this.resume = res.data as UploadFile
    })
  }
}