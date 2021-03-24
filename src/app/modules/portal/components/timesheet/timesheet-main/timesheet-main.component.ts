import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { DailyStatusService } from 'src/app/services/dailyStatus/dailyStatus.service';

@Component({
  selector: 'app-timesheet-main',
  templateUrl: './timesheet-main.component.html',
  styleUrls: ['./timesheet-main.component.css']
})
export class TimesheetMainComponent implements OnInit {

  constructor(private _auth: TokenService,private _service: DailyStatusService) { }
  id:string;
  supervisorState: any = false;

  ngOnInit(): void {
    this.id =this._auth.decodeToken().id;
    var token = this._auth.decodeToken();
	this._service.reportingEmployees(token.id).subscribe((res: any) => {
			if(res.data.length > 0 )
			  this.supervisorState = true;

		})
  }

}
