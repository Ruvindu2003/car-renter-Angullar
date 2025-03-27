import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UpdateFormComponent } from '../../page/update-form/update-form.component';
import { PostCarComponent } from '../../page/post-car/post-car.component';
import { GetBookingComponent } from '../customer/components/get-booking/get-booking.component';


const routes: Routes = [
  {
    path:"dashborde",
    component:AdminDashboardComponent
  },
  {
    path:"car",
    component:PostCarComponent
  },
  {
    path:"car/:id/edit",
    component:UpdateFormComponent
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
export class AdminRoutingModule { }
