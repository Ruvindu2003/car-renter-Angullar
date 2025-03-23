import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
    {
      path: "dashboard", 
      component: CustomerDashboardComponent
    },
    {
      path: "booking/:id",
      component:BookComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
