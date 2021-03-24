import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from 'src/app/schemas/form-base';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor() { }

  @Input()
  field!: FormBase;
  @Input()
  form!: FormGroup;

  ngOnInit(): void {
  }

  getClass(): string {
    return `col-md-${Math.floor(this.field.groups.length / 12)}`
  }
}
