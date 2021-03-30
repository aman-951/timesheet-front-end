import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/auth/user/user.service';
import { DailyStatusService } from 'src/app/services/dailyStatus/dailyStatus.service';
import { TokenService } from 'src/app/services/auth/token/token.service';

import demodata from 'projects.json';

@Component({
	selector: 'app-assign-employees',
	templateUrl: './assign-employees.component.html',
	styleUrls: ['./assign-employees.component.css']
})
export class AssignEmployeesComponent implements OnInit {

	constructor( private _userService: UserService,private _service: DailyStatusService,private _auth: TokenService) {
	
	}

	projectList = new Set();
	list: any = [];
	employees: any = [];
	saveList: any = [];

	assignForm: FormGroup;
	clientList = new Set();
	selectedClient: any;
	selectedProject: any;
	searched_list: any = [];
	showDetail:any = false;
	errorStr:string;
	
	search_employee(str: any): void {
		this.searched_list = []
		if (!str)
			return
		str = str.trim().toUpperCase()

		this.searched_list = this.list.filter((obj: any) => {
			return obj.name.toUpperCase().indexOf(str) > -1 || obj.email.toUpperCase().indexOf(str) > -1
		})
	}

	add_assignee(id: string): void {
		this.searched_list = []

		let values = this.assignForm.controls['employees'].value
		if (!values)
			values = [id]
		else
			values.push(id)

		this.assignForm.controls['employees'].setValue([...new Set(values)])
	}

	find_user_by_id(id: string): any {
		return this.list.find((user:any) => user?.id === id)
	}

	// remove asignee from assignForm.employees
	remove_asignee(id: string): void {
		let values = this.assignForm.controls['employees'].value
		this.assignForm.controls['employees'].setValue(values.filter((v: string) => v !== id))
	}

    onOptionsSelected(){
	
	this.projectList = new Set();
	this._service.find(this.selectedClient, '', '','add_tasks').subscribe((res:any) => {
			if(res.data.length > 0){			  
		    res.data.forEach((obj:any) =>{
				this.projectList.add(obj.project)
			   }) 
			this.selectedProject = Array.from(this.projectList)[0];
			}
	})
	
    }

	assignEmployee() {
       this.employees = [];
       this.saveList = [];
       this.errorStr = '';
       let values = this.assignForm.controls['employees'].value;
       if(values.length == 0){
	    this.errorStr = 'Assign atleast 1 employee to Project';
        return;
       }
       values.forEach((obj:any) => {
	          this.list.forEach((item:any) => {
		           if(item.id == obj){
			          this.employees.push(item.id + ':' + item.name);
                      
		           }
	            
              })
	
        })       



		var l = this.employees.join();
		this.saveList.push({ client: this.selectedClient, project: this.selectedProject, employees: l });
		this._service.post(this.saveList).subscribe(res => {
			
		})

	}
	
	
	searchEmployee():void{
		this.showDetail = true;
	    this.assignForm.controls['employees'].setValue([...new Set()])
        
		this._service.find(this.selectedClient, this.selectedProject, null,'client_project').subscribe((res:any) => {
			if(res.data.length > 0){
			var str = res.data[0].employees.split(',');
		     str.forEach((obj:any) =>{
			   this.add_assignee(obj.split(':')[0]);
			
		    })
			
			}
		})
		
		
	}

	ngOnInit(): void {

		var token = this._auth.decodeToken();

		this.assignForm = new FormGroup({
			project: new FormControl(),
			client: new FormControl(),
			employees: new FormControl()

		});

        this._service.find('', '', '','add_tasks').subscribe((res:any) => {
		  if(res.data.length > 0){			  
		      res.data.forEach((obj:any) =>{
				this.clientList.add(obj.client)
			   })
           this.selectedClient = Array.from(this.clientList)[0];
	       this.onOptionsSelected();
			}
		  })
		
   
		this._service.reportingEmployees(token.id).subscribe((res: any) => {
			res.data.forEach((obj:any) => {
				this.list.push({ id: obj.id, name: obj.name, email: obj.email });

			});

		})
		




	};




}
