import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading: boolean;

  constructor(private _service: UtilityService) { }

  ngOnInit(): void {
    this._service.loaderStatus.subscribe((status: boolean) => {
      this.loading = status;
    })
  }

}
