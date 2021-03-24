import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { DailyStatusService } from 'src/app/services/dailyStatus/dailyStatus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _auth: TokenService,private _service: DailyStatusService) { }

   supervisorState: any = false;

  ngOnInit(): void {
	var token = this._auth.decodeToken();
	this._service.reportingEmployees(token.id).subscribe((res: any) => {
			if(res.data.length > 0 )
			  this.supervisorState = true;

		})
	
  }

  toggleArrow(e: any): void {
    e.preventDefault();
    e.currentTarget.querySelector('i:last-child').classList.toggle('fa-angle-down')
    e.currentTarget.querySelector('i:last-child').classList.toggle('fa-angle-up')
    document.getElementById('submenu1').classList.toggle('show')
  }
}