import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const baseUrl = ['http://localhost:8080/'];

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { 
    console.log('AdminService initialized');
  }
 postCar(car: any) {
  return this.http.post(baseUrl + "api/admin/car", car, {
    headers: this.createAuthenticationHeader()
  });
 }

 private createAuthenticationHeader():HttpHeaders {
  let authHeader=new HttpHeaders()
  return authHeader.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
 }

 uploadImage(formData: FormData, clientId: string) {
   const headers = { Authorization: `Client-ID ${clientId}` };
   return this.http.post<{ data: { url: string } }>('https://api.imgur.com/3/image', formData, { headers });
 }



  }

