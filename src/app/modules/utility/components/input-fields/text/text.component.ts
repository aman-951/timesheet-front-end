import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from 'src/app/schemas/form-base';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  constructor() { }

  @Input()
  field!: FormBase;
  @Input()
  form!: FormGroup;

  ngOnInit(): void {
  }

}
