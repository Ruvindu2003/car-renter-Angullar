import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UpdateFormComponent } from '../../page/update-form/update-form.component';
import { PostCarComponent } from '../../page/post-car/post-car.component';
import { GetBookingComponent } from '../customer/components/get-booking/get-booking.component';
import { AdminBookingComponent } from './components/admin-booking/admin-booking.component';
import { SearchCarComponent } from './components/search-car/search-car.component';


const routes: Routes = [
  {
    path:"dashborde",
    component:AdminDashboardComponent,
    title:"Admin Dashborde"
  },
  {
    path:"car",
    component:PostCarComponent,
    title:"Post Car"
 
  },
  {
    path:"car/:id/edit",
    component:UpdateFormComponent,
    title:"Update Car"
  },

  {
    path:"adminbooking",
    component:AdminBookingComponent,
    title:"Admin Booking"
  },
  {
    path:"car/search",
    component:SearchCarComponent,
    title:"Search Car"
  }



 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
