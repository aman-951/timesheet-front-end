import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from 'src/app/schemas/form-base';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  field!: FormBase;
  @Input()
  form!: FormGroup;

}
