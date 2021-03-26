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
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import demodata from 'projects.json';

@Component({
	selector: 'app-assign-tasks',
	templateUrl: './assign-tasks.component.html',
	styleUrls: ['./assign-tasks.component.css']
})
export class AssignTasksComponent implements OnInit {

	constructor(private _userService: UserService,
		private fb: FormBuilder,private _service: DailyStatusService) {
	
	}

	
	projectList = new Set();
	
	list: any = [];
	invoiceForm: FormGroup;
	submitForm: FormGroup;
	
	formGroup: FormGroup;
	employees: any = [];
    saveList: any = [];
    clientList = new Set();
    subProjectList = new Set();
	taskList: any = [];
	project:string;
	 selectedClient: any;
	selectedProject: any;
   selectedSubProject: any;
   dateSelected: string;
	 

   onOptionsSelected(){
	
	this.projectList = new Set();
	this._service.find(this.selectedClient, '', '','add_tasks').subscribe((res:any) => {
			if(res.data.length > 0){			  
		    res.data.forEach((obj:any) =>{
				this.projectList.add(obj.project)
			   }) 
			this.selectedProject = Array.from(this.projectList)[0];
			this.onOptionsSelected2();
			}
	})
	
    }

  onOptionsSelected2(){
	
	this.subProjectList = new Set();
	 this._service.find(this.selectedClient, this.selectedProject, '','add_tasks').subscribe((res:any) => {
			if(res.data.length > 0){			
			   res.data.forEach((obj:any) =>{
				this.subProjectList.add(obj.subProject)
			   })  
            this.selectedSubProject = Array.from(this.subProjectList)[0];
			}
	})
	
    }


	getControls() {
	    return (this.invoiceForm.get('Rows') as FormArray).controls;
	}
	
	 addNewRow() {
       this.formArr.push(this.initRows());
    }

	 get formArr() {
	    return this.invoiceForm.get("Rows") as FormArray;
	  }

	 rowArray(i:number) {
	     return this.formArr.controls[i] as FormArray;
	  }
	
	searchTask(value: any) {
		
		this.invoiceForm = this.fb.group({
	      Rows: this.fb.array([]),
		  from:'',
		  to:''
	
	    });
       this.employees = [];

		//this.saveList.push({client:value.client, project:value.project, subProject: value.subProject, tasks: value.tasks});
		this.project = value.subProject;
		this._service.find(value.client, value.project, value.subProject,'add_tasks').subscribe(res => {
			this.taskList = res.data[0].tasks.split(',');
			
			var i=0;
			this.taskList.forEach((obj:any) => {
				
				this.addNewRow();
				 this.rowArray(i).controls['task'].setValue(obj.trim());
				++i;
		
			})
		})
		
		this._service.find(value.client, value.project, null,'client_project').subscribe(res => {
			var str = res.data[0].employees.split(',');
			var i=0;
			str.forEach((obj:any) => {
				var checkBoxName = 'check'+i;
				this.employees.push({name:obj.split(':')[1], checkbox: checkBoxName, id:obj.split(':')[0]})
				i++;
			   

                 if(this.dateSelected){
	                 this._service.getEmployeesForTask(obj.split(':')[0], this.dateSelected,'assignedEmployees','task_assign').subscribe((response:any) => {
						if(response.data.length > 0){
							
							response.data.forEach((obj:any) =>{
								for(var j=0; j<this.invoiceForm.value.Rows.length ; j++){
									if(obj.task == this.invoiceForm.value.Rows[j].task){
										this.rowArray(j).controls[checkBoxName].setValue(true);
									
									}
									
								}
								
								
							})
							
							
						}
						
						})
					
					}
					
					
					
			})
			
			
		})
		
		

	}
	
	initRows() {
    return this.fb.group({
	  task: '',
      check0: '',
      check1: '',
      check2: '',
      check3: '',
      check4: '',
      check5: '',
      check6: '',
      check7: '',
      check8: '',
      check9: '',
      check10: '',
      check11: '',
      check12: '',
      check13: '',
      check14: '',
      check15: '',
      check16: '',
      from:'',
      to:''
      
    });
  }

	assigntask1(value: any): void{
		var listToBeSaved:any = [];
		this.employees.forEach((obj:any) => {
			
			this.invoiceForm.value.Rows.forEach((item:any) => {
				if(item[obj.checkbox]){
				listToBeSaved.push({empId:obj.id, name:obj.name, fromDate: value.from, toDate: value.to, project:this.project, task: item.task});	
				}
				
				
		    })
			
			
		})
		
		this._service.post(listToBeSaved).subscribe()
		
	}

	

	ngOnInit(): void {


		this.formGroup = new FormGroup({
			project: new FormControl(),
			client: new FormControl(),
			subProject: new FormControl(),
			tasks: new FormControl(),
			date: new FormControl()
	
		});
		
		this.invoiceForm = this.fb.group({
	      Rows: this.fb.array([]),
			from:'',
			to:''
	
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
		



	};




}
