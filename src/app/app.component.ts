import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgClass,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent  implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
  title = 'car-renter';

}
