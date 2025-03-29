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
    path:"adminbooking",
    component:AdminBookingComponent
  },
  {
    path:"car/search",
    component:SearchCarComponent

  }



 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
