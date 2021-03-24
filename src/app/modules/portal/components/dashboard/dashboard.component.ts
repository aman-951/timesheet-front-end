import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/auth/user/user.service';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _service: CandidateService,
    private _user:UserService
  ) { }

    total:{
      users:number,
      candidates: number
    } = {
      users: 0,
      candidates: 0
    }

  // total: number = 0


  ngOnInit(): void {
    this.countCandidate()
    this.countUser()
  }

  countCandidate(): void {
    this._service.count().subscribe(res => {
      // @ts-ignore
      this.total.candidates = res.data.total as number
    })
  }

  countUser(): void {
    this._user.count().subscribe(res => {
      // @ts-ignore
      this.total.users = res.data.total as number
    })
  }

}
