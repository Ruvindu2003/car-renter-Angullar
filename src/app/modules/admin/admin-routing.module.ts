import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from '../../post-car/post-car.component';
import { UpdateFormComponent } from '../../page/update-form/update-form.component';

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
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
