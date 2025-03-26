import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-booking',
  imports: [CommonModule],
  templateUrl: './get-booking.component.html',
  styleUrl: './get-booking.component.css'
})
export class GetBookingComponent {
isSpning=false
bookCar:any

  constructor(private service:CustomerService) {
    this.getBooking();
   }

  getBooking() {
    this.service.getCustomerBooking ().subscribe({
      next: (res) => {
        this.isSpning = true;
        console.log(res);
        this.bookCar=res;
      },
      error: () => {
        console.log('Error loading booking details');
      }
    });


  }



}
