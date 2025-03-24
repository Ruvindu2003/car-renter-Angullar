import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  id: number;
  bookingForm!: FormGroup;
  cars: any[] = [];
  existingImages: string[] = [];
  isSpinning: boolean = false; // Fixed typo
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
      error: (err) => {
        this.message.error('Error loading car details');
        console.error(err);
      }
    });
  }

  bookCar() { 
    this.isSpinning = true;
    const formValue = this.bookingForm.value;
    const obj = {
      fromDate: formValue.fromDate,
      toDate: formValue.toDate,
      userid: StorageService.getUserId()
    };
    this.customerService.bookACar(this.id, obj).subscribe({
      next: (res) => {
        console.log(res);
        this.message.success('Car booked successfully');
        this.isSpinning = false;
      },
      error: (err) => {
        this.message.error('Booking failed');
        this.isSpinning = false;
      }
    });
  }
}