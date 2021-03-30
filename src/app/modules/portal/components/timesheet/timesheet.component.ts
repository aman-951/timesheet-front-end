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
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
//import * as logoFile from 'src/assets/image/logo.png';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private _auth: TokenService, private _userService: UserService,
    private fb: FormBuilder, private _service: TimesheetService, private datePipe: DatePipe) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }


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


 


  ngOnInit(): void {

    this.empId = this.route.snapshot.paramMap.get('empId');

    var token = this._auth.decodeToken();

    this._userService.view(this.empId).subscribe(res => {
      this.employeeData = res.data;
      if (this.empId != token.id) {
        this.approveState = true;
      }
    })



    this.submitForm = this.fb.group({
      Rows: new FormArray([])

    });

    this.invoiceForm = this.fb.group({
      Rows: this.fb.array([this.initRows()])

    });


    var currentDate = new Date();
    var month = currentDate.toLocaleString('default', { month: 'short' });

    var previousDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    var month2 = previousDate.toLocaleString('default', { month: 'short' });

    var monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
    var month3 = monthDate.toLocaleString('default', { month: 'short' });


    this.monthList.push({ value: month + " - " + currentDate.getFullYear(), date: currentDate });
    this.monthList.push({ value: month2 + " - " + previousDate.getFullYear(), date: previousDate });
    this.monthList.push({ value: month3 + " - " + monthDate.getFullYear(), date: monthDate });

    if (history.state.selectedMonth) {
      this.selectedMonth = history.state.selectedMonth;
    }
    else {
      this.selectedMonth = month + " - " + currentDate.getFullYear();
    }
    this.onOptionsSelected();

    // this.getWeeksInAMonth(currentDate.getFullYear(), currentDate.getMonth(), month);

  };

  getWeeksInAMonth(year: number, month: number, monStr: string): void {

    this.weeks = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let dayOfWeek = firstDay.getDay();
    let start;
    let oldstart;
    let end;

    for (let i = 1; i < daysInMonth + 1; i++) {

      if (dayOfWeek === 1 || i === 1) {
        start = i;
      }

      if (dayOfWeek === 0 || i === daysInMonth) {

        end = i;

        if (start) {
          this.weeks.push({ value: start + " " + monStr + " to " + end + " " + monStr, start: start, end: end, month: monStr, year: year, month1: month });
          start = null;

        }
      }

      dayOfWeek = new Date(year, month, i + 1).getDay();

    }

    this.onOptionsSelected2(this.weeks[0].value);
    //this.datesSelected(start,end,monStr,year.toString(),month.toString());

  }

  datesSelected(start: number, end: number, monStr: string, year: string, month: string): void {
    this.dateSelectedList = [];
    var j = 0;
    for (var i = start; i <= end; i++) {
      j++;
      var day = new Date(parseInt(year), parseInt(month) - 1, i).toLocaleString('default', { weekday: 'short' });
      this.dateSelectedList.push({ value: i + " " + monStr, str: 'input' + j, vertical: 'verticalHours' + j, year: year, month: month, day: i, dayStr: day });
    }

    this.scheduledHours = 9 * (j - 2);
    this.grandTotal = 0;


    for (var j = 0; j < this.dateSelectedList.length; j++) {
      if (this.dateSelectedList[j].month < 10)
        this.dateSelectedList[j].month = '0' + this.dateSelectedList[j].month;
      if (this.dateSelectedList[j].day < 10)
        this.dateSelectedList[j].day = '0' + this.dateSelectedList[j].day;
    }

//    this._service.swipe(this.empId, year + "-" + month + "-" + start, year + "-" + month + "-" + end).subscribe(res => {
//      var a = 'aman';
//    })

    this._service.list(this.empId, year + "-" + month + "-" + start, year + "-" + month + "-" + end).subscribe(res => {
      this.response = res.data;
      if (this.response.length > 0) {

        this.invoiceForm = this.fb.group({
          Rows: this.fb.array([])

        });

       this.list =[];

        for (var j = 0; j < this.dateSelectedList.length; j++) {
          for (var i = 0; i < this.response.length; i++) {

            if (this.dateSelectedList[j].year + "-" + this.dateSelectedList[j].month + "-" + this.dateSelectedList[j].day == this.response[i].date) {
                var obj = JSON.parse(this.response[i].detail);
               // var split = this.response[i].hours.split(",");

                var hours=0;
              var approvedHours=0,rejectedHours=0,pendingHours=0;
              for (var k = 0; k < obj.length; k++) {
              //  var split1 = split[k].split(":");
                var found = false;
                var index = k;
                for (var z = 0; z < this.invoiceForm.get('Rows').value.length; z++) {
                  if (this.invoiceForm.get('Rows').value[z].project == obj[k].project) {
                    found = true;
                    index = z;
                    if(this.rowArray(index).controls[this.dateSelectedList[j].str].value != '')
                    hours = parseFloat(obj[k].hours) + parseFloat(this.rowArray(index).controls[this.dateSelectedList[j].str].value);
                    else
                    hours = parseFloat(obj[k].hours);
                    break;
                  }
                }


                if (!found) {
                  this.addNewRow();
                  index = this.invoiceForm.get('Rows').value.length - 1;
                  hours =  parseFloat(obj[k].hours);
                }
                
                 
                this.rowArray(index).controls[this.dateSelectedList[j].str].setValue(hours);
                this.rowArray(index).controls['project'].setValue(obj[k].project);
                //this.rowArray(index).controls['task'].setValue(task.replace(/,\s*$/, ""));

                
                if(obj[k].status == 'Approved')
                 approvedHours = approvedHours + parseFloat(obj[k].hours);
                if(obj[k].status == 'Rejected')
                 rejectedHours = rejectedHours + parseFloat(obj[k].hours);
                if(obj[k].status == 'Pending')
                 pendingHours = pendingHours + parseFloat(obj[k].hours);

              }
               this.list.push({ date: this.response[i].date, in: '09:10 AM', out: '05:10 PM', approvedHours: approvedHours,rejectedHours: rejectedHours, pendingHours:pendingHours });

            }

          }
        }

        if (this.approveState) {
          for (var z = 0; z < this.invoiceForm.get('Rows').value.length; z++) {
            for (var j = 0; j < this.dateSelectedList.length; j++) {
              // var input ='input' +z;
              this.rowArray(z).controls[this.dateSelectedList[j].str].disable();
            }
            this.rowArray(z).controls['project'].disable();
          }
        }

        if (!this.approveState) {

          for (var i = 0; i < this.response.length; i++) {
            if (this.response[i].status == 'Approved') {
              for (var j = 0; j < this.dateSelectedList.length; j++) {

                if (this.dateSelectedList[j].year + "-" + this.dateSelectedList[j].month + "-" + this.dateSelectedList[j].day == this.response[i].date) {
                  for (var z = 0; z < this.invoiceForm.get('Rows').value.length; z++) {
                    this.rowArray(z).controls[this.dateSelectedList[j].str].disable();
                  }
                  break;
                }
              }
            }
          }

        }



        this.addHours();
      //  this.saveTimesheet();

      }

      else {
        this.invoiceForm = this.fb.group({
          Rows: this.fb.array([this.initRows()])

        });
        this.list = [];
      }

    })

  }

  onOptionsSelected(): void {
    for (var i = 0; i < this.monthList.length; i++) {
      if (this.monthList[i].value == this.selectedMonth) {
        var date = this.monthList[i].date;
        var month = date.toLocaleString('default', { month: 'short' });
        this.getWeeksInAMonth(date.getFullYear(), date.getMonth(), month);



      }
    }


  }

  onOptionsSelected1(e: any): void {
    this.onOptionsSelected2(e.target.value);
  }

  onOptionsSelected2(value: string): void {
    for (var i = 0; i < this.weeks.length; i++) {
      if (this.weeks[i].value == value) {
        var start = this.weeks[i].start;
        var end = this.weeks[i].end;
        var month = this.weeks[i].month;
        var year = this.weeks[i].year;
        var month1 = this.weeks[i].month1 + 1;
        this.datesSelected(start, end, month, year, month1);


      }
    }


  }


   rowArray(i:number) {
     return this.formArr.controls[i] as FormArray;
   // return this.invoiceForm.get("Rows") as FormArray;
  }

  get formArr() {
    return this.invoiceForm.get("Rows") as FormArray;
  }

  initRows() {


    return this.fb.group({
      project: "No Project",
      task: '',
      input1: [""],
      input2: [""],
      input3: [""],
      input4: [""],
      input5: [""],
      input6: [""],
      input7: [""],
      horizontalHours: [""],
      verticalHours1: [''],
      verticalHours2: [''],
      verticalHours3: [''],
      verticalHours4: [''],
      verticalHours5: [''],
      verticalHours6: [''],
      verticalHours7: [''],
      grandTotalHours: ''
    });
  }

  initRows1() {


    return this.fb.group({
      check: ''

    });
  }

  getControls() {
    return (this.invoiceForm.get('Rows') as FormArray).controls;
  }

  addNewRow() {
    this.formArr.push(this.initRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
    this.addHours();
  }

  saveTimesheet() {
    var hours = '';
    var totalHours: any = 0;
    this.dataToBeSaved = [];
    this.list = [];
    for (var k = 0; k < this.dateSelectedList.length; k++) {
      for (var i = 0; i < this.invoiceForm.getRawValue().Rows.length; i++) {
        if (this.invoiceForm.getRawValue().Rows[i][this.dateSelectedList[k].str] != '') {
          // hours = hours + this.invoiceForm.value.Rows[i][this.dateSelectedList[k].str];
          totalHours = totalHours + parseFloat(this.invoiceForm.getRawValue().Rows[i][this.dateSelectedList[k].str]);
        //  hours = hours + this.invoiceForm.getRawValue().Rows[i].project + ':' + this.invoiceForm.getRawValue().Rows[i].task+ ':'+ this.invoiceForm.getRawValue().Rows[i][this.dateSelectedList[k].str] + ',';
        }
      }
      if (totalHours > 0) {
        var date = this.dateSelectedList[k].year + "-" + this.dateSelectedList[k].month + "-" + this.dateSelectedList[k].day;
      //  var currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    //    this.dataToBeSaved.push({ date: date, hours: hours.replace(/,\s*$/, ""), empId: this.empId, status: 'Pending', submittedDate: currentDate });
        this.list.push({ date: date, in: '09:10 AM', out: '05:10 PM', hours: totalHours, status: '' });
      }
      // else{
      //    var date=this.dateSelectedList[k].year + "-" + this.dateSelectedList[k].month + "-" + this.dateSelectedList[k].day;
      //     this.dataToBeSaved.push({ date:date , hours: '', empId: this.empId, status: '', submittedDate:'' });
      // }
      totalHours = 0;
      hours = '';
    }

    for (var i = 0; i < this.response.length; i++) {
      for (var j = 0; j < this.list.length; j++) {
        if (this.response[i].date == this.list[j].date) {
          this.list[j].status = this.response[i].status;
         // this.dataToBeSaved[j].status = this.response[i].status;
          if (this.list[j].status == 'Approved') {
            this.list[j].statusColor = '#28a745';
          }
          else if (this.list[j].status == 'Rejected') {
            this.list[j].statusColor = '#DF330E';
          }
          else if (this.list[j].status == 'Pending') {
            this.list[j].statusColor = '#ffc107';
          }

          break;
        }
      }

    }


    //this.addCheckboxes();
  }

  get formArr1() {
    return this.submitForm.get("Rows") as FormArray;
  }

  private addCheckboxes() {
    this.submitForm = this.fb.group({
      Rows: new FormArray([])

    });
    this.list.forEach(() => this.formArr1.push(this.initRows1()));
    // this.formArr1.push(this.initRows1());
  }

  addHours() {


    // this.invoiceForm.getRawValue()
    // horizontal add
    var j = 0;
    var horHours = 0;
    this.grandTotal = 0;
    for (var i = 0; i < this.invoiceForm.getRawValue().Rows.length; i++) {
      for (var j = 1; j <= 7; j++) {
        var b = 'input' + j;
        if (this.invoiceForm.getRawValue().Rows[i][b] != '') {
          horHours = horHours + parseFloat(this.invoiceForm.getRawValue().Rows[i][b]);

        }
      }
      this.rowArray(i).controls['horizontalHours'].setValue(horHours);
      horHours = 0;
    }

    // vertical add
    for (var j = 1; j <= 7; j++) {
      var b = 'input' + j;
      var c = 'verticalHours' + j;
      for (var i = 0; i < this.invoiceForm.getRawValue().Rows.length; i++) {
        if (this.invoiceForm.getRawValue().Rows[i][b] != '') {
          horHours = horHours + parseFloat(this.invoiceForm.getRawValue().Rows[i][b]);
          this.grandTotal = this.grandTotal + parseFloat(this.invoiceForm.getRawValue().Rows[i][b]);
        }
      }
      this.rowArray(0).controls[c].setValue(horHours);
      //this.invoiceForm.controls[c].setValue(horHours);
      horHours = 0;
    }
    this.rowArray(0).controls['grandTotalHours'].setValue(this.grandTotal);

  }

  submitTimesheet(): void {
    var listToBePushed = [];
    for (var i = 0; i < this.dataToBeSaved.length; i++) {
      if (this.dataToBeSaved[i].status != 'Approved') {
        this.dataToBeSaved[i].status = 'Pending';
        this.list[i].status = 'Pending';
        listToBePushed.push(this.dataToBeSaved[i]);
      }
    }
    this._service.post(listToBePushed).subscribe(res => {

    })

  }

  approveTimesheet(): void {
    var listToBePushed = [];
    for (var i = 0; i < this.submitForm.value.Rows.length; i++) {
      if (this.submitForm.value.Rows[i].check) {
        this.dataToBeSaved[i].approvedDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
        this.dataToBeSaved[i].status = 'Approved';
        this.list[i].status = 'Approved';
        listToBePushed.push(this.dataToBeSaved[i]);
      }
    }
    this._service.post(listToBePushed).subscribe(res => {

    })
  }

  rejectTimesheet(): void {
    var listToBePushed = [];
    for (var i = 0; i < this.submitForm.value.Rows.length; i++) {
      if (this.submitForm.value.Rows[i].check) {
        this.dataToBeSaved[i].status = 'Rejected';
        this.list[i].status = 'Rejected';
        listToBePushed.push(this.dataToBeSaved[i]);
      }
    }
    this._service.post(listToBePushed).subscribe(res => {

    })

  }


  exportToExcel(){
	
	
//	 let workbook = new Workbook();
//  let worksheet = workbook.addWorksheet('ProductSheet');
// 
//  worksheet.columns = [
//    { header: 'Id', key: 'id', width: 10 },
//    { header: 'Name', key: 'name', width: 32 },
//    { header: 'Brand', key: 'brand', width: 10 },
//    { header: 'Color', key: 'color', width: 10 },
//    { header: 'Price', key: 'price', width: 10, style: { font: { name: 'Arial Black', size:10} } },
//  ];
// 
//  this.data.forEach(e => {
//    worksheet.addRow({id: e.id, name: e.name, brand:e.brand, color:e.color, price:e.price },"n");
//  });
// 
//  workbook.xlsx.writeBuffer().then((data) => {
//    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//    fs.saveAs(blob, 'ProductData.xlsx');
//  })
 
	 const data:any = []
	 const title = 'Timesheet';
//    this.invoiceForm.getRawValue().Rows.forEach(obj =>{
//	     var internalArray = [];
//		 internalArray.push(obj.project);
//		 internalArray.push(obj.input1);
//		 internalArray.push(obj.input2);
//         internalArray.push(obj.input3);
//	    data.push(internalArray);
//	
//    })
  


 var taskSet = new Set();
 this._service.list(this.empId, '2021-03-01', '2021-03-31').subscribe(res => {
      this.response = res.data;
      if (this.response.length > 0) {

       
          for (var i = 0; i < this.response.length; i++) {
                var obj = JSON.parse(this.response[i].detail);
               obj.forEach((item:any) =>{
	             taskSet.add(item.task);	                	
               })
          }

         taskSet.forEach(obj =>{
	             var internalArray = [];
                 internalArray.push(obj);
  	             data.push(internalArray);	
        })

         data.forEach((main:any) => {
	         for (var i = 0; i < this.response.length; i++) {
		        var day = parseInt(this.response[i].date.split('-')[2])
                var obj = JSON.parse(this.response[i].detail);
                var hours = 0;
               obj.forEach((item:any) =>{
	                  if(main[0] == item.task){
		                hours = hours + parseFloat(item.hours);
	                 }           	
               })
                   if(hours > 0)
                   main[day] = hours;
                   else
                   main[day] = '';
              }
	
	
          })
          
        



      }












  const header = ['Tasks']
	const firstDay = new Date(2021, 3, 1);
    const lastDay = new Date(2021, 3, 0);
    const daysInMonth = lastDay.getDate();
  

    for (let i = 1; i < daysInMonth + 1; i++) {
      header.push(i+' Mar');
     }
	header.push('Total Hours');
	
	

//    const data = [
//      [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
//      [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
//      [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
//      [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
//      [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
//      [2007, 1, "Peugeot ", "Peugeot 307", 481, 3.8],
//      [2008, 1, "Toyota ", "Toyota Prius", 217, 2.2],
//      [2008, 1, "Skoda ", "Skoda Octavia", 216, 2.2],
//      [2008, 1, "Peugeot ", "Peugeot 308", 135, 1.4],
//      [2008, 2, "Ford ", "Ford Mondeo", 624, 5.9],
//      [2008, 2, "Volkswagen ", "Volkswagen Passat", 551, 5.2],
//      [2008, 2, "Volkswagen ", "Volkswagen Golf", 488, 4.6],
//      [2008, 2, "Volvo ", "Volvo V70", 392, 3.7],
//      [2008, 2, "Toyota ", "Toyota Auris", 342, 3.2],
//      [2008, 2, "Volkswagen ", "Volkswagen Tiguan", 340, 3.2],
//      [2008, 2, "Toyota ", "Toyota Avensis", 315, 3],
//      [2008, 2, "Nissan ", "Nissan Qashqai", 272, 2.6],
//      [2008, 2, "Nissan ", "Nissan X-Trail", 271, 2.6],
//      [2008, 2, "Mitsubishi ", "Mitsubishi Outlander", 257, 2.4],
//      [2008, 2, "Toyota ", "Toyota Rav4", 250, 2.4],
//      [2008, 2, "Ford ", "Ford Focus", 235, 2.2],
//      [2008, 2, "Skoda ", "Skoda Octavia", 225, 2.1],
//      [2008, 2, "Toyota ", "Toyota Yaris", 222, 2.1],
//      [2008, 2, "Honda ", "Honda CR-V", 219, 2.1],
//      [2008, 2, "Audi ", "Audi A4", 200, 1.9],
//      [2008, 2, "BMW ", "BMW 3-serie", 184, 1.7],
//      [2008, 2, "Toyota ", "Toyota Prius", 165, 1.6],
//      [2008, 2, "Peugeot ", "Peugeot 207", 144, 1.4]
//    ];
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Mar Timesheet');
    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Times New Roman', family: 4, size: 16, bold: true }
    worksheet.addRow([]);
    let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])
    //Add Image
    let logo = workbook.addImage({
      base64: 'data:image/png;base64,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',
      extension: 'png',
    });
    worksheet.addImage(logo, 'E1:I3');
    worksheet.mergeCells('E1:I3');
    worksheet.mergeCells('A1:D2');
    worksheet.mergeCells('A3:D3');
    //Blank Row 
    worksheet.addRow([]);
    //Add Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.font = {size: 12, bold: true }
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
   

    const footer = ['Total hours']

    data.forEach((d:any) => {
	  var totalHours = 0;
	  d.forEach((obj:any) =>{
		if(typeof(obj) == 'number')
		totalHours = totalHours + obj;
	  })
      if(totalHours > 0)
      d[32] =totalHours;
      let row = worksheet.addRow(d);
      let qty = row.getCell(5);
      let color = 'FF99FF99';
      
      
    }
    );
    worksheet.getColumn(1).width = 60;
   // worksheet.getColumn(1).font = { bold: true }
    worksheet.getColumn(33).width = 20;
    worksheet.addRow([]);


     
   
    let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
//    let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
//    footerRow.getCell(1).fill = {
//      type: 'pattern',
//      pattern: 'solid',
//      fgColor: { argb: 'FFCCFFE5' }
//    };
//    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
//    
//    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
//    
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Timesheet.xlsx');
    })













  

    })

























	
	
	

	
	
}

}
