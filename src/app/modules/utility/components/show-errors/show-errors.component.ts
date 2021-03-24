import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent implements OnInit {

  constructor() { }

  @Input() public control: AbstractControlDirective | AbstractControl;

  ngOnInit() { }

  errorMessages(type: string, params: any): string {
    switch (type) {
      case 'required':
        return '##FIELD## can\'t be blank'
      case 'minlength':
        return `##FIELD## should be minimum ${params.requiredLength}characters`
      case 'maxlength':
        return `##FIELD## should not be greater then ${params.requiredLength} characters`
      case 'pattern':
        return '##FIELD## should be a valid'
      case 'email':
        return '##FIELD## should be vaild email.'
      default:
        return 'Unknown Error'
    }
  }

  display(): boolean {
    return (this.control && this.control.errors && (this.control.dirty || this.control.touched)) || false;
  }

  getError(): string {
    let errors = Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field], this.control)
      );

    return errors[0];
  }

  private getMessage(type: string, params: any, control: any) {
    let fname = this.getControlName(control);
    fname = fname.replace("_", " ").replace(" id", "").toLowerCase();
    fname = fname.replace(/\b\w/g, l => l.toUpperCase());
    let msg = this.errorMessages(type, params)
    return msg.replace("##FIELD##", fname);
  }


  getControlName(c: AbstractControl): string | null {
    const formGroup: any = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

}
