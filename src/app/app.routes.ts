import { ChildrenOutletContexts, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';

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
       
    }
   
   
    
   


];
