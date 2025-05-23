import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  id: number;
  bookingForm!: FormGroup;
  cars: any[] = [];
  existingImages: string[] = [];
  isSpinning: boolean = false; 
  dateFormate = 'yyyy-MM-dd';

  constructor(
    private customerService: CustomerService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.id = Number(this.activatedRoute.snapshot.params['id']);
    this.initializeForm();
    this.getCarById();
  }

  private initializeForm(): void {
    this.bookingForm = this.fb.group({
      id: [''],
      name: [''],
      type: [''],
      color: [''],
      modelDate: [''],
      tramsmisson: [''],
      price: [''],
      image: [''],
      fromDate: [null, [Validators.required]], 
      toDate: [null, [Validators.required]]   
    });
    
  }

  private getCarById(): void {
    this.customerService.getCarById(this.id).subscribe({
      next: (res) => {
        this.bookingForm.patchValue(res);
        this.existingImages = res.image || [];
      },
      error: () => {
        this.message.error('Error loading car details');
      }
    });
  }

  bookCar() { 
    this.isSpinning = true;
    const formValue = this.bookingForm.value;
    const userid = StorageService.getUserId(); 
  
    if (!userid) {
      this.message.error('User ID not found in local storage');
      this.isSpinning = false;
      return;
    }
  
    const obj = {
      fromDate: formValue.fromDate,
      toDate: formValue.toDate,
      userId: userid, 
    };

  
    console.log("Book ID: " + obj.userId);
    console.log("From Date: " + obj.fromDate);
    console.log("To Date: " + obj.toDate);
  
    this.customerService.bookACar(this.id, obj).subscribe({ 
      next: (res) => {
        console.log(res);
        this.message.success('Car booked successfully');
        this.isSpinning = false;
      },
      error: (err) => {
        
        console.log(err);
        this.message.error(err);
        this.isSpinning = false;
      }
    });
  }
  cancelBooking() { 
    this.bookingForm.reset();
    this.existingImages = []; 
    this.isSpinning = false;
    this.message.info('Booking cancelled');
    
  }
}  