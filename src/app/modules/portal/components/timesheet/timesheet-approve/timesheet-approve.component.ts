import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet/timesheet.service';
import { TokenService } from 'src/app/services/auth/token/token.service';

@Component({
  selector: 'app-timesheet-approve',
  templateUrl: './timesheet-approve.component.html',
  styleUrls: ['./timesheet-approve.component.css']
})
export class TimesheetApproveComponent implements OnInit {

  constructor(private _service: TimesheetService, private _auth: TokenService) { }
  list: any = [];

  // ListOfEmployees:any  = [];
  listOfEmployees = new Set();
  monthList: any = [];
  selectedMonth: string;

  ngOnInit(): void {




    const currentDate = new Date();
    const firstDayOfFirstMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfFirstMonth1 = firstDayOfFirstMonth.getFullYear() + '-' + (firstDayOfFirstMonth.getMonth() + 1) + '-' + firstDayOfFirstMonth.getDate();
    const lastDayOfFirstMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const lastDayOfFirstMonth1 = lastDayOfFirstMonth.getFullYear() + '-' + (lastDayOfFirstMonth.getMonth() + 1) + '-' + lastDayOfFirstMonth.getDate();
    const month = currentDate.toLocaleString('default', { month: 'short' });

    const previousDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const firstDayOfSecondMonth1 = previousDate.getFullYear() + '-' + (previousDate.getMonth() + 1) + '-' + previousDate.getDate();
    const lastDayOfSecondMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    let lastDayOfSecondMonth1 = lastDayOfSecondMonth.getFullYear() + '-' + (lastDayOfSecondMonth.getMonth() + 1) + '-' + lastDayOfSecondMonth.getDate();
    const month2 = previousDate.toLocaleString('default', { month: 'short' });

    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
    const firstDayOfThirdMonth1 = monthDate.getFullYear() + '-' + (monthDate.getMonth() + 1) + '-' + monthDate.getDate();
    const lastDayOfThirdMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    const lastDayOfThirdMonth1 = lastDayOfThirdMonth.getFullYear() + '-' + (lastDayOfThirdMonth.getMonth() + 1) + '-' + lastDayOfThirdMonth.getDate();
    const month3 = monthDate.toLocaleString('default', { month: 'short' });


    this.monthList.push({ value: month + ' - ' + currentDate.getFullYear(), firstDate: firstDayOfFirstMonth1, lastDate: lastDayOfFirstMonth1 });
    this.monthList.push({ value: month2 + ' - ' + previousDate.getFullYear(), firstDate: firstDayOfSecondMonth1, lastDate: lastDayOfSecondMonth1 });
    this.monthList.push({ value: month3 + ' - ' + monthDate.getFullYear(), firstDate: firstDayOfThirdMonth1, lastDate: lastDayOfThirdMonth1 });

    this.selectedMonth = month + ' - ' + currentDate.getFullYear();
    this.getData(this.selectedMonth);


  }


  onOptionsSelected(e: any): void {
    this.selectedMonth = e.target.value;
    this.getData(this.selectedMonth);
  }

  getData(value: string) {

    this.list = [];
    this.listOfEmployees = new Set();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.monthList.length; i++) {
      if (this.monthList[i].value == value) {




        let pending = false;
        let counter = 0;
        let token = this._auth.decodeToken();
        this._service.approvalList(token.id, this.monthList[i].firstDate, this.monthList[i].lastDate,'daily_status').subscribe((res:any) => {
            for (let i = 0; i < res.data.length; i++) {
            this.listOfEmployees.add(res.data[i].id);
          }

          for (const id of this.listOfEmployees) {
          
             
             var name;
            for (let j = 0; j < res.data.length; j++) {
              if (id == res.data[j].id) { 
	              name = res.data[j].name;
	              break;
                 
              }
               
            }
            
            this.list.push({ empId: id, name: name });
           
          }

        });



      }

    }
  }

}
