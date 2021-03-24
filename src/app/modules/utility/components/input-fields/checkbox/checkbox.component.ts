import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from 'src/app/schemas/form-base';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  field!: FormBase;
  @Input()
  form!: FormGroup;

}
