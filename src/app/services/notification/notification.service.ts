import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  displayNotification(message: string, type: string): void {
    switch (type.toLowerCase()) {
      case 'success':
        this.toastr.success(message, type.toUpperCase(), { closeButton: true, progressBar: true });
        break;
      case 'error':
        this.toastr.error(message, type.toUpperCase(), { closeButton: true, progressBar: true });
        break;
      default:
        this.toastr.info(message, type.toUpperCase(), { closeButton: true, progressBar: true });
        break;
    }
  }
}
