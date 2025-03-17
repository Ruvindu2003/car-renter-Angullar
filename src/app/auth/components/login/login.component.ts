import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform!: FormGroup;

  constructor(private fb: FormBuilder, private authservice: AuthService, private massage: NzMessageService, private route: Router, private storageService: StorageService) {}

  ngOnInit() {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
  if (res && res.userId && res.userRole) {
    const user = {
      jwt: res.jwt,
      userRoles: res.userRole,
      userid: res.userId
    };
    StorageService.saveToken(res.jwt);
    StorageService.saveUser(user);

    if (StorageService.isAdminLogin()) {
      this.route.navigateByUrl('/admin/dashborde'); 
    } else {
      this.route.navigateByUrl('/customer/dashboard'); 
    }
  } else {
    this.massage.error('Bad credentials', { nzDuration: 5000 }); 
  }
});
}
}