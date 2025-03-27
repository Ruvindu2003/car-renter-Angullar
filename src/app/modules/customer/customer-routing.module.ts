import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookComponent } from './components/book/book.component';
import { GetBookingComponent } from './components/get-booking/get-booking.component';


const routes: Routes = [
    {
      path: "dashboard", 
      component: CustomerDashboardComponent
    },
    {
      path: "booking/:id",
      component:BookComponent
    },
    {
      path:"bookings",
      component:GetBookingComponent
    }
   
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
