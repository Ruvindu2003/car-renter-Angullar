import { formatDate, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../modules/admin/services/admin.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-post-car',
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
  
})
export class PostCarComponent {
      postCarForm!: FormGroup;

      selectFile: File | null = null;
listOfOption: Array<{ label: string; value: string }> = [];
listofBrand=['Toyota','Honda','Nissan','Mazda','Subaru','Mitsubishi','Suzuki',
  'Daihatsu','Isuzu','Hino','Mercedes-Benz','BMW','Audi',
  'Volkswagen','Volvo','Peugeot','Renault','Citroen','Fiat','Alfa Romeo','Ford',
  'Chevrolet','Chrysler','Dodge','Jeep','Tesla','Hyundai','Kia','Daewoo','Ssangyong','Lexus',
  'Infiniti','Acura','Cadillac','Buick','Lincoln','Jaguar','Land Rover','Range Rover','Porsche','Ferrari',
  'Lamborghini','Maserati','Bentley','Rolls Royce','Lotus','McLaren','Bugatti','Aston Martin','Mini','Smart',
  'Opel','Seat','Skoda','Saab','Lancia','Alpina','Hummer','Pontiac','Saturn','GMC','Oldsmobile','Plymouth','Mercury',
  'Eagle','AMC','DeLorean','Morgan','TVR','MG','Triumph','Jensen','Lada','Moskvich','ZAZ','UAZ','GAZ','LuAZ','ZIL','PAZ','Kamaz',
  'MAZ','BelAZ','KrAZ','ZiL','ZiS']
  listofType: string[] = ["Petrole", "Diesel", "Hybrid", "Electric"];
  listOfTransmission: string[] = ["Manual", "Automatic", "CVT", "DCT"];
  lisOfColours: string[] = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Silver", "Grey", "Brown", "Orange", "Purple", "Pink"];
  listOfDriveType: string[] = ["2WD", "4WD", "AWD"];
  imagePreview: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder, private adminservice: AdminService, private router: Router, private notification: NzNotificationService) {}



  ngOnInit() {
this.postCarForm = this.fb.group({
  brand: [null, [Validators.required]],
  name: [null, [Validators.required]],
  type: [null, [Validators.required]],
  price: [null, [Validators.required]],
  tramsmisson: [null, [Validators.required]],
  Type: [this.listOfDriveType[0], [Validators.required]], 
  color: [this.lisOfColours[0], [Validators.required]], 
  moddleDate: [new Date().getFullYear(), [Validators.required]], 
  mileage: [0, [Validators.required]], 
  description: [null, [Validators.required]],
  image: [null, [Validators.required]]
  });
  }
     


  postCar() {
  console.log(this.postCarForm.value);
  console.log(this.selectFile);
  const formatData: FormData = new FormData();
  formatData.append('name', this.postCarForm.value.name);
  formatData.append('color', this.postCarForm.value.colour);
  formatData.append('tramsmisson', this.postCarForm.value.transmission);
  formatData.append('brand', this.postCarForm.value.brand);
  formatData.append('type', this.postCarForm.value.type);
  formatData.append('Date', this.postCarForm.value.year);
  formatData.append('description', this.postCarForm.value.description);
  formatData.append('price', this.postCarForm.value.price);
  formatData.append('image', this.selectFile!);

  console.log(formatData);

  this.adminservice.postCar(formatData).subscribe({
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
    this.selectFile = event.target.files[0];
    this.previwImage();
  }
}
previwImage() {
const reader =new FileReader();
reader.onload = () => { 
  this.imagePreview = reader.result;
  console.log(this.imagePreview);  
  
  }
  reader.readAsDataURL(this.selectFile!);


}

}
