import { ChildrenOutletContexts, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';


export const routes: Routes = [
    {
        path:"",
        component:HomepageComponent

    },
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
        path:"chat",
        component:ChatbotComponent

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
