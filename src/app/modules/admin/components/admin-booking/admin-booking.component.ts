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


  changeBookingStatus(bookId:number,bookCarStatus:string){
    this.isSpinig =true;
    this.service.changeStatus(bookId,bookCarStatus).subscribe((res:any)=>{
    this.isSpinig=false;
      console.log(res);
      this.massage.success("status changed sucessfully",{nzDuration:500})
    })

  }
  }


