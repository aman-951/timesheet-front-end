import { Component, OnInit } from '@angular/core';
import { TimesheetInOut } from 'src/app/schemas/timesheet-inout';
import { FormGroup, FormControl, FormArray, AbstractControl, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TimesheetService } from 'src/app/services/timesheet/timesheet.service';
import { identifierModuleUrl } from '@angular/compiler';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DailyStatusService } from 'src/app/services/dailyStatus/dailyStatus.service';

@Component({
	selector: 'app-dailystatus-assignTask',
	templateUrl: './dailystatus-assignTask.component.html',
	styleUrls: ['./dailystatus-assignTask.component.css']
})
export class DailystatusAssignTaskComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router, private _auth: TokenService, private _userService: UserService,
		private fb: FormBuilder, private _service: DailyStatusService) {
		console.log(this.router.getCurrentNavigation().extras.state);
	}

	label: string = 'Assign Task 1';
	tooltip: any = 'tool';
	currentUrl: any;
	previousUrl: any;
	projectList: any = ['No Project', 'Project 1', 'Project 2', 'Project 3'];
	projectRows: any = [''];
	monthList: any = [];
	weeks: any = [];
	dataToBeSaved: any = [];
	reportedHours: number = 0;
	time: string = '9';
	dateSelectedList: any = [];
	list: any = [];
	empId: any;
	approveState: any = false;


	data: any[] = [{ from: new Date(), to: new Date() }];
	dataSource = new BehaviorSubject<AbstractControl[]>([]);
	displayColumns = ['from', 'to'];
	rows: FormArray = this.fb.array([]);
	form: FormGroup = this.fb.group({ 'dates': this.rows });

	invoiceForm: FormGroup;
	submitForm: FormGroup;
	response: any;
	employeeData: any;
	scheduledHours: number;
	grandTotal: number = 0;
	selectedMonth: string;
	dateSelected: string;
	status: string;
	statusColor: string;
	formGroup: FormGroup;
	employees: any = [];


	assigntask(value: any) {

		this.employees.forEach((obj:any) => {
			obj.project = value.project;
			obj.task = value.task;
			obj.fromDate = value.from;
			obj.toDate = value.to;
			delete obj.checked;
		});
		this._service.post(this.employees).subscribe(res => {
			this.status = 'Pending';
		})

	}
	onCheckboxChange(e: any) {
		this.employees.forEach((obj:any) => {
			if (obj.name == e.currentTarget.value) {
				obj.checked = e.currentTarget.checked;
			}

		});
	}

	ngOnInit(): void {

		var token = this._auth.decodeToken();

		this.formGroup = new FormGroup({
			project: new FormControl(),
			task: new FormControl(),
			from: new FormControl(""),
			to: new FormControl("")
		});


		this._service.reportingEmployees(token.id).subscribe((res: any) => {
			res.data.forEach((obj:any) => {
				this.employees.push({ name: obj.name, empId: obj.id, checked: false });
			});

		})



	};




}
