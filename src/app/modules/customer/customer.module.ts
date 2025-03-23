import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { Routes, RouterModule,  } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerRoutingModule,RouterModule,
    ReactiveFormsModule,FormsModule

  ]
})
export class CustomerModule { }
