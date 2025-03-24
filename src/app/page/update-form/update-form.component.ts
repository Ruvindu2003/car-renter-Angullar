import { Component, Injectable } from '@angular/core';
import { AdminService } from '../../modules/admin/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from '../../auth/components/image-upload/image-upload.component';
import { routes } from '../../app.routes';
import { ImageCompPathService } from '../../services/image-comp-path.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-update-form',
  imports: [ImageUploadComponent,CommonModule,FormsModule,ReactiveFormsModule,],
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent {
  id: number;
upadateForm!:FormGroup
exitngImages:string|null = null;
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
selectedFile: File | null = null;
imageUrlCaptured: string | null = null;
iamgChange: boolean = false;


constructor(private adminService: AdminService, private activeRoute: ActivatedRoute, private fb: FormBuilder, private imgcomppathservice:ImageCompPathService) {
  this.id = Number(this.activeRoute.snapshot.params['id']);
  this.upadateForm=this.fb.group({
      brand: [null, [Validators.required]],
          name: [null, [Validators.required]],
          type: [null, [Validators.required]],
          price: [null, [Validators.required]],
          transmission: [this.listOfTransmission[0], [Validators.required]],
          driveType:[this.listOfDriveType[0] , [Validators.required]],
          color: [null, [Validators.required]],
          modelDate: [new Date().getFullYear(), [Validators.required]],
          description: [null, [Validators.required]],
          image: [null, [Validators.required]]


})
  this.getByCarId();
}


getByCarId() {
  this.adminService.getCarById(this.id).subscribe((res: any) => {
    console.log(res);
    const CarDto=res
    this.upadateForm.patchValue(CarDto);
    this.exitngImages=CarDto.image;
  });
}


onFileChange(event: any) {
  this.selectedFile = event.target.files[0];
  if (this.selectedFile) {
    this.imageUrlCaptured = URL.createObjectURL(this.selectedFile);
  }
  this.iamgChange  = true; 
  this.previewImage(); 
}

previewImage() {
  const reader = new FileReader();
  reader.onload = (e: any) => {
    this.imageUrlCaptured = e.target.result;
  };
  if (this.selectedFile) {
    reader.readAsDataURL(this.selectedFile);
  }
}

update() {
  this.imageUrlCaptured = this.imgcomppathservice.getImageUrl();
  const car = {
    name: this.upadateForm.value.name, 
    color: this.upadateForm.value.color,
    transmission: this.upadateForm.value.transmission,
    brand: this.upadateForm.value.brand,
    driveType: this.upadateForm.value.driveType,
    modelDate: this.upadateForm.value.modelDate,
    description: this.upadateForm.value.description,
    price: this.upadateForm.value.price,
    image: this.imageUrlCaptured
  };

  this.adminService.UpdateCar(this.id, car).subscribe({
    next: (response: any) => {

      console.log(response);
      
      console.log('Car updated successfully:', response);
      alert('Car updated successfully!');
    },
    error: (error: any) => {
      console.error('Error updating car:', error);
      alert('Failed to update the car. Please try again.');
    },
  });
}

}