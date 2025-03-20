import { CommonModule, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../modules/admin/services/admin.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-post-car',
  imports: [NgFor, ReactiveFormsModule, CommonModule],
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
  listofType: string[] = ["Petrole", "Diesel", "Hybrid", "Electric"];
  listOfTransmission: string[] = ["Manual", "Automatic", "CVT", "DCT"];
  lisOfColours: string[] = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Silver", "Grey", "Brown", "Orange", "Purple", "Pink"];
  listOfDriveType: string[] = ["2WD", "4WD", "AWD"];
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private adminservice: AdminService, private router: Router, private notification: NzNotificationService) { }
  
  private IMGUR_CLIENT_ID = 'a61e3e6b14153e3f20487e948c9ca224';
  formatData: FormData = new FormData();
  imageUrl: string = '';
  status: string = '';

  ngOnInit() {
    this.postCarForm = this.fb.group({
      brand: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      price: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      driveType: [this.listOfDriveType[0], [Validators.required]],
      color: [this.lisOfColours[0], [Validators.required]],
      moddleDate: [new Date().getFullYear(), [Validators.required]],
      mileage: [0, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]]
    });
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  postCar() {
    if (!this.imageUrl) {
      this.notification.create('error', 'Error', 'Please select an image to post the car.', { nzDuration: 500 });
      return;
    }

    this.uploadImage(); // In case the image needs to be uploaded before sending the form

    this.formatData.append('name', this.postCarForm.value.name);
    this.formatData.append('color', this.postCarForm.value.color);
    this.formatData.append('transmission', this.postCarForm.value.transmission);
    this.formatData.append('brand', this.postCarForm.value.brand);
    this.formatData.append('type', this.postCarForm.value.type);
    this.formatData.append('Date', this.postCarForm.value.moddleDate);
    this.formatData.append('description', this.postCarForm.value.description);
    this.formatData.append('price', this.postCarForm.value.price);
    this.formatData.append('image', this.imageUrl);

    this.adminservice.postCar(this.formatData).subscribe({
      next: (res) => {
        this.notification.create('success', 'Success', 'Car posted successfully', { nzDuration: 500 });
        console.log(res);
        this.router.navigate(['/admin/dashboarde']);
      },
      error: (error) => {
        console.log(error);
        this.notification.create('error', 'Error', 'Failed to post car', { nzDuration: 500 });
      }
    });
  }

  onFileSelected(event: any) {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;  // Set the image preview
      };
      
      reader.readAsDataURL(file);  // Read the file as Data URL for preview
      this.selectFile = file;
      this.uploadImage();
    }
  }

  uploadImage() {
    if (!this.selectFile) return;

    const formData = new FormData();
    formData.append('image', this.selectFile);

    const API_KEY = this.IMGUR_CLIENT_ID;

    this.status = 'Uploading...';

    this.adminservice.uploadImage(formData, API_KEY).subscribe({
      next: (res: { data: { url: string } }) => {
        this.status = 'Upload successful!';
        this.imageUrl = res.data.url;
      },
      error: (err: any) => {
        this.status = 'Upload failed: ' + err.message;
        this.notification.create('error', 'Error', 'Failed to upload image', { nzDuration: 500 });
      }
    });

    console.log(this.status);
    console.log(this.imageUrl);
  }
}