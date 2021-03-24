import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBase } from 'src/app/schemas/form-base';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() fields: FormBase[];
  @Output() submitResp: EventEmitter<any> = new EventEmitter();
  @Input() btn_label: string = 'submit';
  @Input() values: object = {};

  form!: FormGroup;
  spinner: boolean = false;

  constructor(private _utility: UtilityService) { }

  ngOnInit(): void {
    this.updateSpinnerStatus()
    this.generateForm()
  }

  /**
   * Check for change in @Input values
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    // detect if change occur
    if (changes.values && changes.values.currentValue) {
      for (let key in this.values)
        if (this.form.controls[key])
          // @ts-ignore
          this.form.controls[key].setValue(this.values[key])
    }
  }

  updateSpinnerStatus() {
    this._utility.spinnerStatus.subscribe((status: boolean) => {
      this.spinner = status;
    })
  }

  generateForm(): void {
    let formFields: any = {};

    for (let field of this.fields)
      if (field.type === 'group')
        for (let item of field.groups)
          formFields[item.name] = new FormControl(null, item.validators)
      else
        formFields[field.name] = new FormControl(null, field.validators)

    this.form = new FormGroup(formFields);
  }

  submit() {
    if (this.form.valid)
      this.submitResp.emit(this.form.value)
  }
}