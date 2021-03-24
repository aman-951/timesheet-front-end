import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token/token.service';

@Component({
  selector: 'task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.css']
})
export class TaskMainComponent implements OnInit {

  constructor(private _auth: TokenService) { }
  id:string;

  ngOnInit(): void {
    this.id =this._auth.decodeToken().id;
  }

}
