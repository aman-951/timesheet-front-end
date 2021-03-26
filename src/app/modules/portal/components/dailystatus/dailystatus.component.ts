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
import {MatTooltipModule} from '@angular/material/tooltip';
import { DailyStatusService } from 'src/app/services/dailyStatus/dailyStatus.service';

@Component({
  selector: 'app-dailystatus',
  templateUrl: './dailystatus.component.html',
  styleUrls: ['./dailystatus.component.css']
})
export class DailystatusComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private _auth: TokenService, private _userService: UserService,
    private fb: FormBuilder, private _service: DailyStatusService) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

   tooltip:any='tool';
  currentUrl: any;
  previousUrl: any;
 // projectList: any = ['No Project', 'Project 1', 'Project 2', 'Project 3'];
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
  response: any;
  employeeData: any;
  scheduledHours: number;
  grandTotal: number = 0;
  selectedMonth: string;
  dateSelected:string;
  statusColor:string;
  projectList:any = new Set();
  taskList:any = new Set();
  activityList:any = new Set();
  activityMap:any = new Map();
  blockerDescription:any = false;
  disabledState: any = false;

  taskListForTable:any = [];
  activityListForTable:any = [];
  counter: number = 0;
  combinedData: any =[];
  checked : any = false;

  ngOnInit(): void {

    
    
    this.empId = this.route.snapshot.paramMap.get('empId');

    var token = this._auth.decodeToken();

    this._userService.view(this.empId).subscribe(res => {
      this.employeeData = res.data;
      if (this.empId != token.id) {
        this.approveState = true;
      }
    })


    this.invoiceForm = this.fb.group({
      Rows: this.fb.array([this.initRows()])

    });


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


    this.monthList.push({ value: month + ' - ' + currentDate.getFullYear(), firstDate: firstDayOfFirstMonth, lastDate: lastDayOfFirstMonth });
    this.monthList.push({ value: month2 + ' - ' + previousDate.getFullYear(), firstDate: previousDate, lastDate: lastDayOfSecondMonth });
    this.monthList.push({ value: month3 + ' - ' + monthDate.getFullYear(), firstDate: monthDate, lastDate: lastDayOfThirdMonth });


    if (history.state.selectedMonth) {
      this.selectedMonth = history.state.selectedMonth;
    }
    else {
      this.selectedMonth = month + " - " + currentDate.getFullYear();
    }
    this.onOptionsSelected();
    
    // this.getWeeksInAMonth(currentDate.getFullYear(), currentDate.getMonth(), month);

  };


  
  onBlockerChange(): void{
	this.blockerDescription = false;
	for(var i=0; i<this.invoiceForm.value.Rows.length ; i++){
		if(this.invoiceForm.value.Rows[i].blocker == 'Yes'){
			this.blockerDescription = true;	
			this.rowArray(i).controls['blockerDescription'].enable();		
		}else{
			this.rowArray(i).controls['blockerDescription'].disable();
		}
		 
	}
	
	  
	
	
  }
 

  onOptionsSelected(): void {
	  this.weeks = [];
    for (var i = 0; i < this.monthList.length; i++) {
      if (this.monthList[i].value == this.selectedMonth) {
        var firstDate = this.monthList[i].firstDate;
        var lastDate = this.monthList[i].lastDate.getDate();
        var month = this.monthList[i].value.split(" ")[0];
        for(var j=firstDate.getDate() ; j<=lastDate ; j++){
	     var date = firstDate.getFullYear() + '-' + (firstDate.getMonth() + 1) + '-' + j;
	     this.weeks.push({value:j+ " "+month, date:date});
        }

      }
    }
    this.onOptionsSelected2(this.weeks[0].value);

  }

  onOptionsSelected1(e: any): void {
    this.onOptionsSelected2(e.target.value);
  }

  projectSelectionDropdown(e: any,i:number): void {
    this.projectSelectOption1(e.target.value,null,i);
  }

  projectSelectOption1(project: string, task: any, i:number): void {
	
	this.combinedData.forEach((obj:any) =>{
		if(obj.project == project){
			this.taskListForTable[i] = obj.tasks;	
			if(task == null)
			task = Array.from(obj.tasks)[0];
			this.taskSelectOption(project,task,i);
            this.rowArray(i).controls['task'].setValue(task);
		}
		
		
		
	})	
		
	}
	
	
  taskSelectionDropdown(e: any,i:number): void {
    this.taskSelectOption(this.invoiceForm.value.Rows[i].project,e.target.value,i);
  }

 taskSelectOption(project: string, task: string, i:number): void {
	this.combinedData.forEach((obj:any) =>{
		if(obj.project == project && obj.activities.size >0){		
			this.activityList = obj.activities.get(task).split(',');
           this.activityListForTable[i] = this.activityList;
           this.rowArray(i).controls['activity'].setValue(Array.from(this.activityList)[0]);
           
		}
		
		
		
	})	
   // this.rowArray(this.counter).controls['activity'].setValue(Array.from(this.activityList)[0]);
  }

  projectSelectOption(value: string, loadcounter:number): void {
	
	var object:any = {};
	

     this._service.getActivities(value,'add_tasks').subscribe((res:any) => {
			if(res.data.length > 0){	
				this.activityMap = new Map();		
			   res.data.forEach((obj:any) =>{
				if(obj.activity != null){
				 var activities = obj.activity.split('},');
			     activities.forEach((item:any) =>{
				  item = item.replace(/{/g, "").replace(/}/g, "").replace(/\[/g, '').replace(/]/g, '');
				  this.activityMap.set(item.split(':')[0].trim(), item.split(':')[1]);
				
			     })
                }  
			   }) 
                
         object.project = value;
         object.activities =   this.activityMap;
              
			}
	})
	
	
	this._service.list(this.empId, this.dateSelected,value,'task_assign').subscribe((res:any) => {
		this.taskList = new Set();
	          res.data.forEach((obj:any) => {
		             this.taskList.add(obj.task);
		
         })
         loadcounter++;
         object.tasks = this.taskList;
          this.combinedData.push(object);
      
          if(loadcounter == this.projectList.size){
	          this.loadInitialData();
           }
          
     //  this.taskListForTable[this.counter] = this.taskList;
     // this.taskSelectOption(Array.from(this.taskList)[0], obj);
     //this.rowArray(this.counter).controls['task'].setValue(Array.from(this.taskList)[0]);

      
     })

  }

 loadInitialData(){
	
	
	

          this._service.list(this.empId, this.dateSelected,'','daily_status').subscribe((res:any) => {
	
	      if (res.data.length > 0) {
		 
	    this.invoiceForm = this.fb.group({
		          Rows: this.fb.array([])
		
		        });
			   
			
	         var obj = JSON.parse(res.data[0].detail);
             this.counter--;
             for(var i=0; i<obj.length; i++){
	            this.addNewRow(obj[i].project,obj[i].task);

                if(obj[i].blocker == 'Yes'){
	              this.blockerDescription = true;
                  this.rowArray(i).controls['blockerDescription'].enable();	
                }
                if(obj[i].addActivity != null){
	               this.rowArray(i).controls['addActivity'].enable();
                }

                this.rowArray(i).controls['activity'].setValue(obj[i].activity);
				this.rowArray(i).controls['blocker'].setValue(obj[i].blocker);
				this.rowArray(i).controls['project'].setValue(obj[i].project);
				this.rowArray(i).controls['blockerDescription'].setValue(obj[i].blockerDescription);				
				this.rowArray(i).controls['task'].setValue(obj[i].task);
				this.rowArray(i).controls['addActivity'].setValue(obj[i].addActivity);
				this.rowArray(i).controls['hours'].setValue(obj[i].hours);
				this.rowArray(i).controls['status'].setValue(obj[i].status);
				this.rowArray(i).controls['employeeComment'].setValue(obj[i].employeeComment);
				this.rowArray(i).controls['managerComment'].setValue(obj[i].managerComment);
				this.rowArray(i).controls['activityStatus'].setValue(obj[i].activityStatus);
	
				if(this.approveState || obj[i].status == 'Approved'){
				//this.disabledState = true;
				this.rowArray(i).controls['activity'].disable();
				this.rowArray(i).controls['blocker'].disable();
				this.rowArray(i).controls['blockerDescription'].disable();
				this.rowArray(i).controls['addActivity'].disable();
				this.rowArray(i).controls['project'].disable();
				this.rowArray(i).controls['task'].disable();
				this.rowArray(i).controls['hours'].disable();
				//this.rowArray(i).controls['employeeComment'].disable();
				//this.rowArray(i).controls['managerComment'].disable();
				this.rowArray(i).controls['activityStatus'].disable();
				}
				if(this.approveState){
					this.rowArray(i).controls['employeeComment'].disable();
				}else{
					this.rowArray(i).controls['managerComment'].disable();
				}
				
				
	
              }
	
	         this.addHours();
	         }
             else{
	             this.counter--;
	           this.invoiceForm = this.fb.group({
		          Rows: this.fb.array([])
		
		        });
                this.addNewRow(null,null);

              } 

            })
	
	
	
	
}

 getTaskList(i:number){
	return this.taskListForTable[i];
}

 getActivityList(i:number){
	return  this.activityListForTable[i];
}




  onOptionsSelected2(value: string): void {
	this.blockerDescription = false;
	this.disabledState = false;
    for (var i = 0; i < this.weeks.length; i++) {
      if (this.weeks[i].value == value) {
         this.dateSelected = this.weeks[i].date;
         this.statusColor= '#212529';

              this.counter = 0;
              this.projectList = new Set();
              this.taskList = new Set();
              this.taskListForTable = [];
              this.activityListForTable = [];
              this.combinedData = [];
              this.checked = false;
              this._service.list(this.empId, this.dateSelected,'','task_assign').subscribe((res:any) => {
	          if(res.data.length > 0){
		          res.data.forEach((obj:any) => {
			             this.projectList.add(obj.project);
	              	})
                    for(var j=0; j<res.data.length ; j++){
                         this.projectSelectOption(res.data[j].project,j);
   
	              	}
                   
	               // this.projectSelectOption(Array.from(this.projectList)[0]);
               }
               else if(res.data.length == 0){
	                this.loadInitialData();
	                 this.projectList.add('No Project');
		             this.taskList.add('No Task');
               }
                 
             // this.rowArray(0).controls['project'].setValue(Array.from(this.projectList)[0]);
              // this.rowArray(0).controls['task'].setValue(Array.from(this.taskList)[0]);
               })
	






      }
    }


  }


   rowArray(i:number) {
     return this.formArr.controls[i] as FormArray;
  }

  get formArr() {
    return this.invoiceForm.get("Rows") as FormArray;
  }

  initRows() {

    
    return this.fb.group({
      project: Array.from(this.projectList)[0],
      check: false,
      status: '',
      task: '',
      hours:'',
      activity:'',
      blocker:'No',
      grandTotalHours: '',
      employeeComment: '',
      managerComment: '',
      activityStatus:'Yet to Start',
      addActivity: [{value: '', disabled: true}],
      blockerDescription : [{value: '', disabled: true}]
    });
  }

 

  getControls() {
    return (this.invoiceForm.get('Rows') as FormArray).controls;
  }

  addNewRow(project:any, task: string) {
	this.formArr.push(this.initRows());
	this.counter++;
	if(project == null)
	project = Array.from(this.projectList)[0];
	this.projectSelectOption1(project, task, this.counter);
    
  }

  deleteRow(index: number) {
	this.counter--;
   this.taskListForTable.splice(index, 1);
   this.activityListForTable.splice(index, 1);
    this.formArr.removeAt(index);
    this.addHours();
  }

  saveReport() {
	 for(var i=0; i< this.invoiceForm.getRawValue().Rows.length ; i++){
		this.rowArray(i).controls['status'].setValue('Pending')
	 }
	var myJSON = JSON.stringify(this.invoiceForm.value.Rows);
	this.dataToBeSaved = [];
	 var currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
     this.dataToBeSaved.push({ date: this.dateSelected, detail: myJSON, empId: this.empId, status: 'Pending', submittedDate: currentDate });
	this._service.post(this.dataToBeSaved).subscribe(res => {
    
    })
   
  }

  

  addHours() {
     var hours=0;
     for (var i = 0; i < this.invoiceForm.getRawValue().Rows.length; i++) {
	   if(this.invoiceForm.getRawValue().Rows[i].hours != '')
	   hours = hours + parseFloat(this.invoiceForm.getRawValue().Rows[i].hours); 
	  }
    
    this.rowArray(0).controls['grandTotalHours'].setValue(hours);

  }



  approveReport(): void {
	this.dataToBeSaved = [];
	 for(var i=0; i< this.invoiceForm.getRawValue().Rows.length ; i++){
		if(this.invoiceForm.getRawValue().Rows[i].check)
		this.rowArray(i).controls['status'].setValue('Approved')
	  }
	
		var myJSON = JSON.stringify(this.invoiceForm.getRawValue().Rows);
	   var currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
     this.dataToBeSaved.push({ date: this.dateSelected, empId: this.empId, detail: myJSON, status: 'Approved', approvedDate: currentDate });
     this._service.post(this.dataToBeSaved).subscribe(res => {
	this.checked =false;
		for(var i=0; i< this.invoiceForm.getRawValue().Rows.length ; i++){
		this.rowArray(i).controls['check'].setValue(false)
	  }
     
    })
  }

  rejectReport(): void {
	this.dataToBeSaved = [];
    for(var i=0; i< this.invoiceForm.getRawValue().Rows.length ; i++){
		if(this.invoiceForm.getRawValue().Rows[i].check)
		this.rowArray(i).controls['status'].setValue('Rejected')
	   }
   	var myJSON = JSON.stringify(this.invoiceForm.getRawValue().Rows);
	   var currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
     this.dataToBeSaved.push({ date: this.dateSelected, empId: this.empId, detail: myJSON, status: 'Rejected', approvedDate: currentDate });
     this._service.post(this.dataToBeSaved).subscribe(res => {
     this.checked =false;
		for(var i=0; i< this.invoiceForm.getRawValue().Rows.length ; i++){
		this.rowArray(i).controls['check'].setValue(false)
	  }
    })

  }

  focus(event:any):void{
    this.tooltip=event.currentTarget.value;
  }

  focusOut(event:any):void{
    this.tooltip='';
  }

  getStatusColor(i:number){
	 var status = this.invoiceForm.getRawValue().Rows[i].status;
           if(status == 'Approved'){
                return '#28a745';
            }else if(status == 'Pending'){
                return '#ffc107';
            }else{
                return'#DF330E';
            }

}

  getDisabledState(i:number){
	 var status = this.invoiceForm.getRawValue().Rows[i].status;
           if(status == 'Approved')
                return true;
           else
                return false;
            

}

 selectIndividualCheckbox(){
	var checkCounter = 0;
	this.checked =false;
	for(var i=0; i< this.invoiceForm.getRawValue().Rows.length ; i++){
		if(this.invoiceForm.getRawValue().Rows[i].check)
		  checkCounter ++;
	  }
    if(checkCounter == this.invoiceForm.getRawValue().Rows.length){
	  this.checked =true;
    }
	
 }
  
 selectAll(e:any){
	if(e.currentTarget.checked){
	  this.checked =true;
	  for(var i=0; i< this.invoiceForm.getRawValue().Rows.length ; i++){
		this.rowArray(i).controls['check'].setValue(true)
	  }
		
	}
	else{
		 this.checked =false;
		for(var i=0; i< this.invoiceForm.getRawValue().Rows.length ; i++){
		this.rowArray(i).controls['check'].setValue(false)
	  }
	}
	
 }

 addActivity(i:number){
	this.rowArray(i).controls['addActivity'].enable();
	
 }

removeActivity(i:number){
	this.rowArray(i).controls['addActivity'].disable();
	
 }


}
