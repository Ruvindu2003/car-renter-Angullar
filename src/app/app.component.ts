import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { StorageService } from './auth/services/storage/storage.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent  implements OnInit{
  ngOnInit(): void {
    initFlowbite();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminLogin = StorageService.isAdminLogin();
        this.isCustomerLogin = StorageService.isCustomerLogin();
      }
    });
   
  }
  title = 'car-renter';
    constructor(private router:Router){}
    
    isAdminLogin:boolean=StorageService.isAdminLogin()
    isCustomerLogin:boolean=StorageService.isCustomerLogin()
   
  logOut(){
    
  }
    
   }

  

