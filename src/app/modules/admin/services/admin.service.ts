import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = ['http://localhost:8080/'];

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  constructor(private http: HttpClient) { 
    console.log('AdminService initialized');
  }
 postCar(car: any) {
  return this.http.post(baseUrl + "api/admin/car", car);
 }

 getAllCars():Observable<any>{
  return this.http.get(baseUrl +"api/admin/getAll")
 }

 DeletCar(id:number):Observable<any>{
  return this.http.delete(baseUrl + "api/admin/Delete/"+id);


  }

  UpdateCar(id:number,car:any):Observable<any>{
    return this.http.put(baseUrl + "api/admin/Update-By-Car/"+id,car);
  }

  getCarById(id:number):Observable<any>{
    return this.http.get(baseUrl + "api/admin/Search-By-Id/"+id);
  }
  }

