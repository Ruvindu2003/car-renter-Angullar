import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-search-car',
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.css'
})
export class SearchCarComponent {
  cars: any[] = [];
  carList: any[] = [];

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

  isSpining =false;
  validateForm!: FormGroup;
  

  constructor(private fb :FormBuilder,private adminservice:AdminService){
    this.validateForm=this.fb.group({
      brand:[null],
      type:[null],
      color:[null],
      tramsmisson:[null]

    })

    
  }


  searchCar(){
    console.log(this.validateForm.value);
    this.isSpining=true;
    this.adminservice.Searchcar(this.validateForm).subscribe((res)=>{
      this.isSpining=false;
      this.carList = Array.isArray(res) ? res.map((element: any) => {
        return {
          ...element,
          priceImage: element.image 
        };
      }) : [];
      console.log(res);
      
    });
   
      
   
    

  }

}
