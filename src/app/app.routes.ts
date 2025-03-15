import { ChildrenOutletContexts, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './modules/customer/components/customer-dashboard/customer-dashboard.component';

export const routes: Routes = [
    {
        path:"Home",
        component:HomepageComponent
        
        
    },
    {
        path:"Rejister",
        component:SignupComponent
       
    },
    {
        path:"Login",
        component:LoginComponent
       
    },
   
    
    {
        path: "admin",
        loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)
      },
      {
        path:"customer",
        loadChildren:()=> import("./modules/customer/customer.module").then(c=>c.CustomerModule)
      }
   
   
    
   


];
