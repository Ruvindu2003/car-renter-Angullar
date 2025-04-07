import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookComponent } from './components/book/book.component';
import { GetBookingComponent } from './components/get-booking/get-booking.component';
import { ChatbotComponent } from '../../../chatbot/chatbot.component';
import { GooogleMapComponent } from '../../gooogle-map/gooogle-map.component';
import { WhatssappBoatComponent } from '../../whatssapp-boat/whatssapp-boat.component';



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
    },
    {
      path:'chat',
      component:ChatbotComponent
    },
    {
      path: 'googlemap',
      component:GooogleMapComponent
    },
    {
      path:'whatssapp',
      component:WhatssappBoatComponent

    }
   
   
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
