import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import demodata from 'projects.json';		// temp json
import { DailyStatusService } from 'src/app/services/dailyStatus/dailyStatus.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
	selector: 'app-add-tasks',
	templateUrl: './add-tasks.component.html',
	styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

	projectForm: FormGroup;
	fields: FormArray;
	projectList = new Set();
	formGroup: FormGroup;
    clientList = new Set();
    selectedClient: any;
	selectedProject: any;
	subProjectList = new Set();
   selectedSubProject: any;
   saveList:any =[];
    tasks:any;
   file: File;

  clientListFromFile = new Set();
  subProjectListFromFile = new Set();
   projectListFromFile = new Set();

  public changeListener(files: FileList){
	if(files && files.length > 0) {
	     this.file = files.item(0); 
    }
  }

	public submitFile(){
	  if(this.file != null) {
	       let reader: FileReader = new FileReader();
	       reader.readAsText(this.file);
	       reader.onload = (e) => {
	          let csvData: string = reader.result as string;
			let allTextLines = csvData.split(/\r?\n|\r/);
			    let headers = allTextLines[0].split(',');
			    let lines = [];

				for ( let i = 1; i < allTextLines.length; i++) {
				        // split content based on comma
				        let data = allTextLines[i].split(',');
                        if(data[0] != '')
                        this.clientListFromFile.add(data[0]);
                        if(data[1] != '')
		                this.projectListFromFile.add(data[1]);
                        if(data[2] != '')
                        this.subProjectListFromFile.add(data[2]);
				        
				    }


                    var project;
                    var client;
                    var subProject;
                    var tasks = '';
                    var activity = '';
                    this.saveList = [];
                    var combinedActivity = '';
                    var previousTask ='';
                    this.subProjectListFromFile.forEach(obj =>{
	                     var flag = 0;
                         var taskFlag = 0;
                         combinedActivity = '';
                         activity = '';
                         for( let j = 1; j < allTextLines.length; j++) {
	                         let data = allTextLines[j].split(',');
                             
                             
                             if(data[2] == '')
                             data[2] = subProject;
                             if(data[2] != subProject && flag == 1){
	                         activity = activity.replace(/,\s*$/, "");
	                         combinedActivity = combinedActivity + '{' + previousTask + ' : ' + activity +'}';
	                         break;
                             }
                             
                             
	                         if(obj == data[2]){ 
		
			                      if(data[0] != '')
	                               client = data[0];
	                              if(data[1] != '')
	                               project = data[1];	
	                              if(data[2] != '')
	                               subProject = data[2];			
			
			                       if(data[3] != ''){
				                     if(activity != ''){
					                  activity = activity.replace(/,\s*$/, "");
				                      combinedActivity = combinedActivity + '{' + previousTask + ' : ' + activity +'},';
                                     }
                                     previousTask = data[3];
			                         tasks = tasks + data[3] + ',';                                    
                                     activity = '';
                                   }
	
	                               activity = activity + data[4] + ',';
	                               flag = 1;
                                  

	                          }
                         }
 
                         if(combinedActivity != '')
                         combinedActivity = '[' + combinedActivity + ']';
                         this.saveList.push({client:client, project:project, subProject: subProject, tasks: tasks.replace(/,\s*$/, ""), activity: combinedActivity.replace(/,\s*$/, "")});
						 tasks = '';

                      })

                     this._service.post(this.saveList).subscribe(res => {
							
						})
				       
			

                }
	         
	     
	    }
	}

	constructor(
		private _fb: FormBuilder,
		private _service: DailyStatusService,
		private _utility: UtilityService
	) { }

	ngOnInit(): void {
		this.projectForm = new FormGroup({
			client: new FormControl(null, [Validators.required]),
			project: new FormControl(null, [Validators.required]),
			subProject: new FormControl(null, [Validators.required]),
			tasks: this._fb.array([])
		})
		
		//this.fields = this.projectForm.get('tasks') as FormArray;
		//this.fields.push(this.createItem());
		
		this._service.find('', '', '','add_tasks').subscribe((res:any) => {
		  if(res.data.length > 0){			  
		      res.data.forEach((obj:any) =>{
				this.clientList.add(obj.client)
			   })
           this.selectedClient = Array.from(this.clientList)[0];
	       this.onOptionsSelected();
			}
		  })
		
	      

	}

	createItem() {
		return this._fb.group({
			task: new FormControl(null, [Validators.required, Validators.maxLength(20)])
		});
	}

	addremoveFields(i: number = null): void {
		if (i || i === 0)
			return this.fields.removeAt(i);

		this.fields.push(this.createItem());
	}

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

	searchTask(): void{
		//this.tasks = '';
		this.fields = this.projectForm.get('tasks') as FormArray;
		this.fields.controls = [];
		    
		this._service.find(this.selectedClient, this.selectedProject, this.selectedSubProject,'add_tasks').subscribe((res:any) => {
			if(res.data.length > 0){
			
			var i=0;
			  this.tasks = res.data[0].tasks.split(",");
		    this.tasks.forEach((obj:any) =>{
			     
             this.fields.push(this.createItem());
			     this.projectForm.get("tasks").controls[i].controls['task'].setValue(obj)
			      i++;
		     })
				

			}
		})
		
	}
	
	
	
	addtask() {
        this.saveList = [];
        var taskSaved = '';
        let value = this.projectForm.value
         value.tasks.forEach((obj:any) =>{
	           taskSaved = taskSaved + obj.task + ',';
         })
		this.saveList.push({client:value.client, project:value.project, subProject: value.subProject, tasks: taskSaved.replace(/,\s*$/, "")});
		this._service.post(this.saveList).subscribe(res => {
			
		})

	}
}