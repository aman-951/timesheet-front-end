import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from 'src/app/schemas/form-base';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  constructor() { }

  @Input()
  field!: FormBase;
  @Input()
  form!: FormGroup;

  ngOnInit(): void {
  }

  upload(e:Event) {
    // @ts-ignore
    let file = e.target.files[0]
    if (file) {
      // @ts-ignore
      e.target.closest('.custom-file').querySelector('.custom-file-label').innerHTML = file.name
      this.form.controls[this.field.name].setValue(file)
    }    
  }

}
