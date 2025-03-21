import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports :[CommonModule]
})
export class AdminDashboardComponent {
 public cars: any=[]

  constructor(private adminService: AdminService) {
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res: any) => {
      console.log(res);
      this.cars = Array.isArray(res) ? res.map((element: any) => {
        return {
          ...element,
          priceImage: element.image 
        };
      }) : [];
    });
  }

    DelteCar(id:number){ {
    this.cars=[];
   
    this.adminService.DeletCar(id).subscribe((res: any) => {
      console.log(res);
      this.getAllCars();
    });
  }
  }
}

