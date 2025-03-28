import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { NzMessageService, NzMessageType } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-booking',
  imports: [CommonModule],
  templateUrl: './admin-booking.component.html',
  styleUrl: './admin-booking.component.css'
})
export class AdminBookingComponent {
  isSpinig=false;
  bookcars :any


  constructor(private service: AdminService,private massage:NzMessageService) { }

  getBooking() {
    this.service.getBookings().subscribe((res: any) => {
      this.isSpinig = false;
      console.log(res);
      this.bookcars = res;
    });
  }


  changeBookingStatus(bookingId: number, status: string): void {
    this.isSpinig = true;
    this.service.changeStatus(bookingId, status).subscribe({
        next: (res: any) => {
            this.isSpinig = false;
            console.log(res);
            this.massage.success("Status changed successfully", { nzDuration: 500 });
        },
        error: (err: any) => {
            this.isSpinig = false;
            console.error(err);
            this.massage.error("Failed to change status. Please try again.", { nzDuration: 500 });
        }
    });
}
  }


