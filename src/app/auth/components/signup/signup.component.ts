import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { id_ID } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  isSpinnnging: boolean=false;

  SiginForme!:FormGroup
  constructor(private fb:FormBuilder){

  }
  ngOnInit(){
    this.SiginForme = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['',[Validators.required]],
      password:['',[Validators.required]],
      confirmpassword:['',[Validators.required,this.confirmationValidate]],
       })
  }


  confirmationValidate = (control: FormControl): { [s: string]: boolean } | null => {
   
    if (!control.value) {
      return { required: true };
    }

    if (control.value !== this.SiginForme.controls["password"].value) {
      return { confirm: true, error: true };
    }
  
 
    return null;
  };


  Register(){
    console.log(this.SiginForme.value);
    

    }

}
