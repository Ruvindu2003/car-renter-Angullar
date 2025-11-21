import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgForOf } from "../../../../../node_modules/@angular/common/index"; 

@Component({
  selector: 'app-signup',
  standalone: true, 
  imports: [RouterLink, ReactiveFormsModule, NgForOf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] 
})
export class SignupComponent {
  isSpinning: boolean = false; 
  signupForm!: FormGroup; 

  constructor(private fb: FormBuilder, private authservice: AuthService,private route:Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required, this.confirmationValidate.bind(this)]] 
    });
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean } | null => {
    if (!control.value) {
      return { required: true };
    }

    if (control.value !== this.signupForm?.controls['password'].value) {
      return { confirm: true, error: true };
    }

    return null;
  };

  register() {
    if (this.signupForm.invalid) {
      console.error('Form is invalid');
      alert('Please fill out the form correctly.');
      return;
    }

    this.isSpinning = true; 
    console.log(this.signupForm.value);

    this.authservice.rejister(this.signupForm.value).subscribe({
      next: (res) => {
        this.isSpinning = false; 
        console.log('Registration successful', res);
        this.route.navigateByUrl('/Login');
        alert('Registration successful! Welcome aboard.');
      },
      error: (err) => {
        this.isSpinning = false; 
        console.error('Registration failed', err);
        alert('Registration failed. Please try again later.');
      }
    });
  }
}