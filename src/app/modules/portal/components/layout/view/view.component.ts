import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Toggle sidebar
   */
  toggleSideBar(e:any): void {
    e.preventDefault();
    document.getElementById('wrapper').classList.toggle("toggled");
    e.currentTarget.querySelector('i').classList.toggle('fa-angle-double-left')
    e.currentTarget.querySelector('i').classList.toggle('fa-angle-double-right')
  }

}
