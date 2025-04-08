import { Component } from '@angular/core';
import { AdminService } from '../../../admin/services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WhatssappBoatComponent } from "../../../../whatssapp-boat/whatssapp-boat.component";


@Component({
  selector: 'app-customer-dashboard',
  imports: [CommonModule, RouterLink, WhatssappBoatComponent],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
  showWhatsAppBoat = false;

  public cars: any=[]
  
    constructor(private customerservice: CustomerService,private massege:NzMessageService) {
      this.getAllCars();
    }
  
    getAllCars() {
      this.customerservice.getAllCars().subscribe((res: any) => {
        console.log(res);
        this.cars = Array.isArray(res) ? res.map((element: any) => {
          return {
            ...element,
            priceImage: element.image 
          };
        }) : [];
      });
    }
  
}
