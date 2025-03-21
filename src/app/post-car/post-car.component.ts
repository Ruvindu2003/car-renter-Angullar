import { CommonModule, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../modules/admin/services/admin.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ImageUploadComponent } from "../auth/components/image-upload/image-upload.component";

@Component({
  selector: 'app-post-car',
  imports: [NgFor, ReactiveFormsModule, CommonModule, ImageUploadComponent],
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.css']
})
export class PostCarComponent {
  @ViewChild('fileInput') fileInput: any;
  postCarForm!: FormGroup;

  selectFile: File | null = null;
  listOfOption: Array<{ label: string; value: string }> = [];
  listofBrand = ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Mitsubishi', 'Suzuki',
    'Daihatsu', 'Isuzu', 'Hino', 'Mercedes-Benz', 'BMW', 'Audi',
    'Volkswagen', 'Volvo', 'Peugeot', 'Renault', 'Citroen', 'Fiat', 'Alfa Romeo', 'Ford',
    'Chevrolet', 'Chrysler', 'Dodge', 'Jeep', 'Tesla', 'Hyundai', 'Kia', 'Daewoo', 'Ssangyong', 'Lexus',
    'Infiniti', 'Acura', 'Cadillac', 'Buick', 'Lincoln', 'Jaguar', 'Land Rover', 'Range Rover', 'Porsche', 'Ferrari',
    'Lamborghini', 'Maserati', 'Bentley', 'Rolls Royce', 'Lotus', 'McLaren', 'Bugatti', 'Aston Martin', 'Mini', 'Smart',
    'Opel', 'Seat', 'Skoda', 'Saab', 'Lancia', 'Alpina', 'Hummer', 'Pontiac', 'Saturn', 'GMC', 'Oldsmobile', 'Plymouth', 'Mercury',
    'Eagle', 'AMC', 'DeLorean', 'Morgan', 'TVR', 'MG', 'Triumph', 'Jensen', 'Lada', 'Moskvich', 'ZAZ', 'UAZ', 'GAZ', 'LuAZ', 'ZIL', 'PAZ', 'Kamaz',
    'MAZ', 'BelAZ', 'KrAZ', 'ZiL', 'ZiS']
  listofType: string[] = ["Petrol", "Diesel", "Hybrid", "Electric"];
  listOfTransmission: string[] = ["Manual", "Automatic", "CVT", "DCT"];
  lisOfColours: string[] = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Silver", "Grey", "Brown", "Orange", "Purple", "Pink"];
  listOfDriveType: string[] = ["2WD", "4WD", "AWD"];

  constructor(private fb: FormBuilder, private adminservice: AdminService, private router: Router, private notification: NzNotificationService) { }
  
  public imageUrlCaptured: string = '';
  status: string = '';

  ngOnInit() {
    this.postCarForm = this.fb.group({
      brand: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      price: [null, [Validators.required]],
      tramsmisson: [null, [Validators.required]],
      driveType: [this.listOfDriveType[0], [Validators.required]],
      color: [this.lisOfColours[0], [Validators.required]],
      modelDate: [new Date().getFullYear(), [Validators.required]],
      mileage: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]]
    });
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  postCar() {
    const car = {
      name: this.postCarForm.value.name,
      color: this.postCarForm.value.color,
      tramsmisson: this.postCarForm.value.tramsmisson,
      brand: this.postCarForm.value.brand,
      type: this.postCarForm.value.type,
      modelDate: this.postCarForm.value.modelDate,
      description: this.postCarForm.value.description,
      price: this.postCarForm.value.price,
      image: this.imageUrlCaptured
  };
  
  console.log(car);
  
    this.adminservice.postCar(car).subscribe({
      
      next: (res) => {
        this.notification.create('success', 'Success', 'Car posted successfully', { nzDuration: 500 });
        console.log(res);
        this.router.navigate(['admin/dashborde']);
      },
      error: (error) => {
        console.log(error);
        this.notification.create('error', 'Error', 'Failed to post car', { nzDuration: 500 });
      }
    });
  }
}