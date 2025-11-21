import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { string } from 'three/src/nodes/TSL.js';

const BASICUrl=["http://localhost:8080"]
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  rejister(signupRequest:any):Observable<any>{
    return this.http.post(BASICUrl+"/api/auth/signup",signupRequest)
  }

  login(loginRequest:any):Observable<any>{
    return this.http.post(BASICUrl +"/api/auth/login",loginRequest)
  }
}

