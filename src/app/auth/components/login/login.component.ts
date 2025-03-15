import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Routes, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginform!: FormGroup;

  constructor(private fb: FormBuilder , private authservice: AuthService,private massage:NzMessageService,private route:Router,router:ActivatedRoute) {}

  ngOnInit() {
    this.loginform = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    console.log('Form Value:', this.loginform.value);
    if (this.loginform.valid) {
      console.log('Login successful:', this.loginform.value);
    } else {
      console.log('Login failed, form is invalid.');

    }
   

    this.authservice.login(this.loginform.value).subscribe((res) => {   
      console.log(res);   
      if (res.useId !== null) {     
          const user = {       
              id: res.useId,       
              role: res.useRole     
          };     
          StorageService.saveToken(res.jwt);     
          StorageService.saveUser(user);       

          if (user.role === 'ADMIN') {            
              this.route.navigateByUrl('/admin/dashboard');      
          } else {       
              this.route.navigateByUrl('/customer/dashboard');             
          }   
      } else {     
          this.massage.error('Bad credentials', { nzDuration: 5000 });    
      } 
   });
}
}